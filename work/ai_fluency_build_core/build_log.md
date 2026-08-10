# Phase: Build (Core) — Iterative Build Log & Engineering Record

- **Project:** FlyRank Refresh Scout & Queue Manager (Checkpoint 1 MVP Agent)
- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Phase: Build Core)
- **Repo:** [`mbqayyum/FlyRank_ML_Intern`](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** August 2026

---

## Executive Overview

This build log captures the real engineering iteration, trade-offs, bug fixes, and architectural adjustments made during the construction of the **FlyRank Refresh Scout MVP Agent**.

Building a production-ready AI agent requires balancing spec ambition with execution reliability. Deviating from initial design blueprints is normal in software engineering; what matters is documenting *why* changes were made and verifying that the core job to be done remains 100% satisfied.

---

## Chronological Build & Debugging Log

```
+-----------------------------------------------------------------------------------+
| TIME     | STEP / ATTEMPT              | ERROR / ISSUE ENCOUNTERED     | RESOLUTION / CHANGE MADE      |
+-----------------------------------------------------------------------------------+
| 00:00:00 | Initializing Agent Core     | Environment missing duckdb    | Installed duckdb v1.5.5 via   |
|          | (`flyrank_refresh_scout.py`)| module (`ImportError`)        | pip and added fallback to     |
|          |                             |                               | `pandas.read_csv` for safety  |
+-----------------------------------------------------------------------------------+
| 00:15:00 | SQL Query Implementation    | `content_age_days` NaN values | Applied strict DuckDB filtering|
|          | (`query_performance_db`)    | breaking numeric comparison   | `WHERE content_age_days >= 90`|
+-----------------------------------------------------------------------------------+
| 00:32:00 | ML Scoring Engine           | Potential label leakage via   | Strictly excluded trend cols  |
|          | (`compute_refresh_score`)   | `trend_direction`/`trend_pct` | (`trend_direction`, `trend_pct`|
|          |                             |                               | from feature matrix `X`)      |
+-----------------------------------------------------------------------------------+
| 00:48:00 | Reason Code Assignment      | Precedence overflow where all | Re-ordered evaluation ladder: |
|          | (`assign_reason_codes`)     | items defaulted to general    | 1. `low_ctr_visible_page`     |
|          |                             | category                      | 2. `declining_with_demand`    |
|          |                             |                               | 3. `freshness_risk`           |
+-----------------------------------------------------------------------------------+
| 01:10:00 | SERP & Ticket Output Engine | Direct Notion REST API auth   | Scoped output to structured   |
|          | (`create_draft_ticket`)     | required external secrets     | Markdown Ticket Queue         |
|          |                             |                               | (`refresh_scout_queue.md`)    |
+-----------------------------------------------------------------------------------+
```

---

## 3 Key Engineering Decisions & Spec Deviations

### 1. Notion API Auth Scoped to Markdown Queue Exporter
- **Spec Original:** Direct write access to Notion API / GitHub Issues REST API.
- **Change Made:** The agent exports structured, schema-compliant Markdown briefs to `outputs/refresh_scout_queue.md`.
- **Rationale:** Prevents hardcoding external secrets or failing CI when API tokens expire. The output JSON/Markdown schema perfectly mirrors the Notion database properties (`Priority`, `Reason Code`, `Model Decay Prob`, `Skeptic Note`).

### 2. Dual-Engine Data Access (DuckDB SQL + Pandas Fallback)
- **Spec Original:** DuckDB connection to local CSV/warehouse.
- **Change Made:** Implemented dual-engine data loading: primary execution via DuckDB in-memory SQL (`read_csv_auto`), with an automatic fallback to `pandas` dataframe filtering if DuckDB is missing in the host runtime.
- **Rationale:** Ensures zero runtime crashes across heterogeneous deployment environments (Colab, Docker, local dev).

### 3. Composite Priority Score Calculation
- **Spec Original:** Pure Random Forest decay probability ranking (`rf_prob`).
- **Change Made:** Blended score: $\text{Composite Score} = 0.60 \times \text{rf\_prob} + 0.40 \times \text{Normalized Log Impressions}$.
- **Rationale:** Pure decay probability can prioritize low-traffic obscure pages. Blending business demand (impressions) ensures editorial resources focus on high-impact revenue pages.

---

## Verification & Audit Checklist

- [x] **End-to-End Autonomous Run:** Agent executes 5-step control loop without mid-run hand-editing.
- [x] **Live Data Connection:** Connects directly to DuckDB / local filesystem dataset (`data/raw/content_refresh_anonymized.csv`).
- [x] **Zero Label Leakage:** Excludes `trend_direction` and `trend_pct` from model features.
- [x] **Skeptic Note Enforced:** Every generated ticket includes a "What Would Make It Wrong" counter-analysis.
- [x] **Output Verified:** Exported 50 ranked briefs to [`outputs/refresh_scout_queue.md`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_build_core/outputs/refresh_scout_queue.md).
