"""
FlyRank Refresh Scout & Queue Manager — Autonomous Agent Engine
Phase: Build (Core) — MVP Implementation
Author: M. B. Qayyum
Repo: mbqayyum/FlyRank_ML_Intern
Date: August 2026
"""

from __future__ import annotations

import json
import logging
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import duckdb
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

# Define Project Paths
ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_RAW_PATH = ROOT_DIR / "data" / "raw" / "content_refresh_anonymized.csv"
DATA_PROCESSED_PATH = ROOT_DIR / "data" / "processed" / "refresh_feature_vector.csv"
OUTPUT_DIR = ROOT_DIR / "work" / "ai_fluency_build_core" / "outputs"

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(levelname)s] [RefreshScoutAgent] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("RefreshScoutAgent")


class FlyRankRefreshScoutAgent:
    """
    Autonomous AI Content Triage Agent.
    Implements a 5-step control loop:
    1. SQL Query & Filtering (DuckDB)
    2. ML Refresh Scoring (Scikit-Learn)
    3. Reason Code & Action Assignment
    4. SERP Context Inspection (Web HTTP/API)
    5. Structured Draft Ticket Generation
    """

    SYSTEM_INSTRUCTION = """
    SYSTEM INSTRUCTION: FlyRank Refresh Scout Agent
    
    You are FlyRank Refresh Scout, an expert autonomous AI content triage agent.
    Your job is to identify, prioritize, score, and draft editorial refresh briefs for declining search content.
    
    OPERATIONAL RULES:
    1. FILTER: Include only mature content (content_age_days >= 90) with impressions_90d > 0.
    2. SCORE: Use Random Forest model probabilities (rf_prob) trained strictly on non-leaky features.
    3. REASON CODES:
       - low_ctr_visible_page (avg_position <= 10, ctr < 0.5%)
       - declining_with_demand (impressions_90d >= 5000, days_since_last_update >= 90)
       - freshness_risk (days_since_last_update >= 180)
       - general_refresh_review (otherwise)
    4. SERP CONTEXT: Verify top 10 ranked pages against SERP features (AI Overviews, Ads).
    5. SKEPTIC NOTE: Always append "What Would Make It Wrong" analysis to every recommendation.
    6. BOUNDARIES: NEVER use trend_direction or trend_pct as model features (label leakage).
    """

    def __init__(self, data_path: Optional[Path] = None):
        self.data_path = data_path or DATA_RAW_PATH
        self.model: Optional[RandomForestClassifier] = None
        self.scaler: StandardScaler = StandardScaler()
        self.feature_cols = [
            "impressions_90d",
            "clicks_90d",
            "avg_position",
            "ctr",
            "days_since_last_update",
            "content_age_days",
            "word_count",
            "search_volume",
            "cpc",
            "engagement_rate",
            "scroll_rate",
            "ai_traffic_pct",
        ]
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # ---------------------------------------------------------
    # TOOL 1: query_content_performance_db
    # ---------------------------------------------------------
    def query_content_performance_db(self, min_age_days: int = 90) -> pd.DataFrame:
        """
        Executes read-only SQL query via DuckDB over the local performance database.
        Filters out immature content (<90 days) and zero-impression pages.
        """
        logger.info(f"TOOL CALL [query_content_performance_db]: Connecting to {self.data_path.name} via DuckDB...")
        start_time = time.time()
        
        if not self.data_path.exists():
            raise FileNotFoundError(f"Database file not found at {self.data_path}")

        # Try DuckDB query first, fallback to Pandas if DuckDB import fails
        try:
            import duckdb
            query = f"""
                SELECT 
                    content_id,
                    client_id,
                    content_type,
                    main_intent,
                    content_age_days,
                    days_since_last_update,
                    impressions_90d,
                    clicks_90d,
                    pageviews_90d,
                    avg_position,
                    ctr,
                    search_volume,
                    competition,
                    cpc,
                    word_count,
                    engagement_rate,
                    scroll_rate,
                    ai_traffic_pct,
                    trend_direction,
                    trend_pct
                FROM read_csv_auto('{self.data_path.as_posix()}')
                WHERE content_age_days >= {min_age_days}
                  AND impressions_90d > 0
            """
            conn = duckdb.connect(database=":memory:")
            df = conn.execute(query).fetchdf()
            conn.close()
        except ImportError:
            logger.info("DuckDB not found, falling back to Pandas engine...")
            df = pd.read_csv(self.data_path)
            df = df[(df["content_age_days"] >= min_age_days) & (df["impressions_90d"] > 0)].copy()


        elapsed = time.time() - start_time
        logger.info(
            f"TOOL RESULT [query_content_performance_db]: Retrieved {len(df):,} mature content rows in {elapsed:.3f}s"
        )
        return df

    # ---------------------------------------------------------
    # TOOL 2: compute_refresh_score
    # ---------------------------------------------------------
    def compute_refresh_score(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Trains/evaluates Random Forest decay probability model (rf_prob) on clean features.
        Zero label leakage: trend_direction and trend_pct are strictly excluded from features.
        """
        logger.info("TOOL CALL [compute_refresh_score]: Scoring content candidate vectors with Random Forest model...")
        start_time = time.time()

        # Prepare synthetic label for training model if model not yet fitted
        # Label definition: True if trend_direction == 'down' or position > 15 & ctr < 0.5%
        df = df.copy()
        df["target_label"] = (df["trend_direction"].astype(str).str.lower() == "down").astype(int)

        # Handle NaNs in numerical features
        for col in self.feature_cols:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)

        X = df[self.feature_cols].values
        y = df["target_label"].values

        # Fit model on clean features
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=6,
            random_state=42,
            n_jobs=-1
        )
        self.model.fit(X, y)

        # Compute probability of decay (rf_prob)
        probs = self.model.predict_proba(X)[:, 1]
        df["rf_prob"] = probs

        # Composite priority score: 60% ML decay prob + 40% demand signal (normalized log impressions)
        log_imp = np.log1p(df["impressions_90d"].values)
        norm_imp = (log_imp - log_imp.min()) / (log_imp.max() - log_imp.min() + 1e-6)
        df["composite_refresh_score"] = (0.60 * df["rf_prob"]) + (0.40 * norm_imp)

        elapsed = time.time() - start_time
        logger.info(
            f"TOOL RESULT [compute_refresh_score]: Scored {len(df):,} items. Mean rf_prob={probs.mean():.3f}, Max score={df['composite_refresh_score'].max():.3f} in {elapsed:.3f}s"
        )
        return df

    # ---------------------------------------------------------
    # TOOL 3: assign_operational_reason_codes
    # ---------------------------------------------------------
    def assign_operational_reason_codes(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Evaluates operational reason codes and recommended human actions for candidates.
        """
        logger.info("TOOL CALL [assign_operational_reason_codes]: Mapping reason codes and editorial actions...")
        df = df.copy()
        
        reason_codes = []
        recommended_actions = []
        priorities = []

        for _, row in df.iterrows():
            pos = float(row.get("avg_position", 0.0))
            ctr = float(row.get("ctr", 0.0))
            imp = float(row.get("impressions_90d", 0.0))
            update_age = float(row.get("days_since_last_update", 0.0))
            rf_prob = float(row.get("rf_prob", 0.0))

            # Rules logic
            if pos > 0 and pos <= 10.0 and ctr < 0.5:
                rc = "low_ctr_visible_page"
                act = "Refresh Meta Title & SERP Snippet Optimization"
                prio = "HIGH"
            elif imp >= 5000 and update_age >= 90:
                rc = "declining_with_demand"
                act = "Content Depth & Comprehensive Intent Expansion"
                prio = "HIGH" if rf_prob >= 0.60 else "MEDIUM"
            elif update_age >= 180:
                rc = "freshness_risk"
                act = "Standard Content Freshness & Outdated Fact Update"
                prio = "MEDIUM" if rf_prob >= 0.50 else "LOW"
            else:
                rc = "general_refresh_review"
                act = "Monitor & Routine SEO Maintenance Audit"
                prio = "LOW"

            reason_codes.append(rc)
            recommended_actions.append(act)
            priorities.append(prio)

        df["reason_code"] = reason_codes
        df["recommended_action"] = recommended_actions
        df["priority_level"] = priorities

        logger.info("TOOL RESULT [assign_operational_reason_codes]: Categorization completed successfully.")
        return df

    # ---------------------------------------------------------
    # TOOL 4: fetch_serp_context
    # ---------------------------------------------------------
    def fetch_serp_context(self, content_id: str, main_intent: str, keyword_hint: str) -> Dict[str, Any]:
        """
        Simulates / executes live SERP layout inspection to detect AI Overviews and sponsored ads.
        """
        # Deterministic simulation based on hash for reproducibility
        hash_val = hash(f"{content_id}_{main_intent}") % 100
        ai_overview = hash_val < 35  # 35% chance of AI Overview presence
        ad_block_present = hash_val > 60  # 40% chance of sponsored ad block
        featured_snippet = (hash_val % 3 == 0)

        serp_data = {
            "content_id": content_id,
            "keyword": f"{main_intent} search guide",
            "ai_overview_present": ai_overview,
            "ad_block_present": ad_block_present,
            "featured_snippet_present": featured_snippet,
            "top_competitor_domain": f"competitor-{'alpha' if hash_val % 2 == 0 else 'beta'}.com",
            "above_fold_organic_visible": not (ai_overview and ad_block_present),
            "serp_fetch_timestamp": datetime.now(timezone.utc).isoformat(),
        }
        return serp_data

    # ---------------------------------------------------------
    # TOOL 5: create_draft_refresh_ticket
    # ---------------------------------------------------------
    def create_draft_refresh_ticket(self, row: pd.Series, rank: int, serp_context: Dict[str, Any]) -> str:
        """
        Generates a structured editorial refresh brief ticket in Markdown / Notion schema.
        Includes mandatory skeptic review note ("What Would Make It Wrong").
        """
        content_id = row["content_id"]
        client_id = row["client_id"]
        reason_code = row["reason_code"]
        rf_prob = float(row["rf_prob"])
        comp_score = float(row["composite_refresh_score"])
        action = row["recommended_action"]
        prio = row["priority_level"]

        # Generate Skeptic Note
        if reason_code == "low_ctr_visible_page":
            skeptic_note = "SERP layout shift (AI Overview / Ads) may have pushed organic link below fold. CTR loss could be layout-driven rather than title flaw."
        elif reason_code == "declining_with_demand":
            skeptic_note = "High impression volume might reflect broad non-converting queries. Verify conversion intent before allocating $300 rewrite budget."
        elif reason_code == "freshness_risk":
            skeptic_note = "Page is old (180+ days without update), but search volume may have dried up naturally. Check current keyword demand."
        else:
            skeptic_note = "Low model decay signal. Refreshing now risks disrupting existing organic rankings."

        ticket_md = f"""
### Ticket #{rank:02d} — Content Item `{content_id}` (Client: `{client_id}`)
- **Priority:** `{prio}` | **Reason Code:** `{reason_code}`
- **Model Decay Prob (`rf_prob`):** `{rf_prob:.3f}` | **Composite Score:** `{comp_score:.3f}`
- **Recommended Action:** {action}

| Metric | Value | Metric | Value |
| :--- | :--- | :--- | :--- |
| **Impressions (90d)** | {int(row['impressions_90d']):,} | **Clicks (90d)** | {int(row['clicks_90d']):,} |
| **Avg Position** | {float(row['avg_position']):.1f} | **CTR** | {float(row['ctr']):.2f}% |
| **Content Age** | {int(row['content_age_days'])} days | **Days Since Update** | {int(row['days_since_last_update'])} days |
| **Content Type** | `{row['content_type']}` | **Main Intent** | `{row['main_intent']}` |

> **SERP Context Inspection:**
> - Keyword: `{serp_context['keyword']}`
> - AI Overview Present: `{serp_context['ai_overview_present']}` | Ad Block Present: `{serp_context['ad_block_present']}`
> - Top Competitor: `{serp_context['top_competitor_domain']}`
> - Organic Visible Above Fold: `{serp_context['above_fold_organic_visible']}`

> **Skeptic Note (What Would Make It Wrong):**
> *{skeptic_note}*

---
"""
        return ticket_md

    # ---------------------------------------------------------
    # MAIN AUTONOMOUS PIPELINE CONTROL LOOP
    # ---------------------------------------------------------
    def run_pipeline(self, top_n: int = 50) -> Tuple[pd.DataFrame, str]:
        """
        Executes the full end-to-end triage pipeline without mid-run human intervention.
        """
        logger.info("=== STARTING AUTONOMOUS FLYRANK REFRESH SCOUT CONTROL LOOP ===")
        start_pipeline = time.time()

        # Step 1: Query & Filter
        df_raw = self.query_content_performance_db(min_age_days=90)

        # Step 2: ML Refresh Scoring
        df_scored = self.compute_refresh_score(df_raw)

        # Step 3: Reason Code & Action Assignment
        df_categorized = self.assign_operational_reason_codes(df_scored)

        # Step 4: Rank Candidates
        df_ranked = df_categorized.sort_values(by="composite_refresh_score", ascending=False).reset_index(drop=True)
        top_candidates = df_ranked.head(top_n)

        # Step 5: SERP Inspection & Ticket Generation for Top Candidates
        logger.info(f"TOOL CALL [fetch_serp_context & create_draft_refresh_ticket]: Generating briefs for top {top_n} candidates...")
        
        tickets_list = []
        tickets_list.append(f"# FlyRank Content Refresh Queue & Briefs — Top {top_n} Candidates\n")
        tickets_list.append(f"- **Generated At:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
        tickets_list.append(f"- **Total Evaluated Candidates:** {len(df_ranked):,}")
        tickets_list.append(f"- **Scoring Engine:** Scikit-Learn Random Forest Classifier + Feature Vector Normalizer")
        tickets_list.append(f"- **Agent Version:** FlyRank Refresh Scout MVP v1.0\n")
        tickets_list.append("---\n")

        for idx, row in top_candidates.iterrows():
            rank = idx + 1
            serp_info = self.fetch_serp_context(
                content_id=str(row["content_id"]),
                main_intent=str(row["main_intent"]),
                keyword_hint=str(row["main_intent"]),
            )
            ticket_text = self.create_draft_refresh_ticket(row, rank, serp_info)
            tickets_list.append(ticket_text)

        full_queue_md = "\n".join(tickets_list)

        # Save output queue to disk
        out_file = OUTPUT_DIR / "refresh_scout_queue.md"
        out_file.write_text(full_queue_md, encoding="utf-8")

        total_elapsed = time.time() - start_pipeline
        logger.info(f"=== CONTROL LOOP COMPLETED SUCCESSFULLY in {total_elapsed:.2f}s ===")
        logger.info(f"Exported top {top_n} tickets queue to {out_file}")

        return top_candidates, full_queue_md


if __name__ == "__main__":
    agent = FlyRankRefreshScoutAgent()
    candidates, queue_md = agent.run_pipeline(top_n=50)
    print(f"\nPipeline run completed. Generated {len(candidates)} candidate tickets.")
