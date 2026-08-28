# FlyRank Refresh Scout: Autonomous Search Content Triage Agent

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-Deployed-54E399?style=for-the-badge&logo=github)](https://mbqayyum.github.io/FlyRank_ML_Intern/)
[![Credential Verification](https://img.shields.io/badge/FlyRank_Credential-FR--ML--2026--QAYYUM-54E399?style=for-the-badge&logo=shield)](https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.)
[![Demo Video](https://img.shields.io/badge/Demo_Video-3--5_Min_Showcase-red?style=for-the-badge&logo=youtube)](https://youtu.be/FR-ML-REFRESH-SCOUT-DEMO)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Autonomous AI agent operating a 5-step control loop that prioritizes decaying organic search content across 30,000+ pages, delivering a 3.1× Precision@50 lift over heuristic rules with zero feature leakage.**

---

## 1. What the Agent Does & For Whom

In enterprise organic search portfolios managing 10,000+ indexed URLs, over **54.2% of content experiences ongoing traffic decay**. Refreshing an article costs **$150–$500** in editorial and SME overhead. Relying on arbitrary age rules ("refresh anything older than 180 days") produces a **76% false alarm rate (0.240 Precision@50)**, squandering editorial budgets on healthy pages while letting decaying revenue drivers collapse.

The **FlyRank Refresh Scout Agent** is an autonomous triage system that continuously monitors search telemetry, predicts decay probabilities using a leakage-audited Random Forest model, assigns diagnostic reason codes, fetches SERP layout context, and generates structured editorial ticket briefs with skeptic review notes.

### Who It Is For:
- **Head of SEO & Content Directors:** Eliminates guesswork with a ranked, ROI-prioritized editorial queue.
- **Editorial & Writing Teams:** Receives pre-drafted Markdown action briefs with exact target keywords and refresh instructions.
- **ML & Data Infrastructure Teams:** Provides an explainable, leak-free agentic control loop validated on held-out enterprise clients.

---

## 2. Quickstart Setup (Reproducible by Anyone)

Follow these exact steps from a clean terminal to clone, install, and execute the agent in **under 10 seconds**:

### Prerequisites
- Python 3.10+ (tested on Python 3.10, 3.11, 3.12, 3.13, 3.14)
- Git

### Installation & Execution
```bash
# 1. Clone the repository
git clone https://github.com/mbqayyum/FlyRank_ML_Intern.git
cd FlyRank_ML_Intern

# 2. Create and activate a virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the Autonomous Refresh Scout Agent MVP (processes 30,000 rows & exports top 50 tickets)
python work/ai_fluency_build_core/run_agent_mvp.py
```

### Verified Terminal Output
```text
======================================================================
      FLYRANK REFRESH SCOUT AGENT — CHECKPOINT 1 MVP RUNNER
======================================================================
[INFO] [RefreshScoutAgent] === STARTING AUTONOMOUS FLYRANK REFRESH SCOUT CONTROL LOOP ===
[INFO] [RefreshScoutAgent] TOOL CALL [query_content_performance_db]: Connecting to DuckDB...
[INFO] [RefreshScoutAgent] TOOL RESULT [query_content_performance_db]: Retrieved 30,000 mature content rows in 0.68s
[INFO] [RefreshScoutAgent] TOOL CALL [compute_refresh_score]: Scoring candidate vectors with Random Forest model...
[INFO] [RefreshScoutAgent] TOOL RESULT [compute_refresh_score]: Scored 30,000 items (Mean rf_prob=0.542, Max=0.811) in 1.01s
[INFO] [RefreshScoutAgent] TOOL CALL [assign_operational_reason_codes]: Mapping reason codes and editorial actions...
[INFO] [RefreshScoutAgent] TOOL RESULT [assign_operational_reason_codes]: Categorization completed successfully.
[INFO] [RefreshScoutAgent] TOOL CALL [fetch_serp_context & create_draft_refresh_ticket]: Generating briefs for top 50 candidates...
[INFO] [RefreshScoutAgent] === CONTROL LOOP COMPLETED SUCCESSFULLY in 3.55s ===
[INFO] [RefreshScoutAgent] Exported top 50 tickets queue to outputs/refresh_scout_queue.md
======================================================================
VERIFICATION SUMMARY:
 - Candidate Items Processed & Ranked: 50
 - Priority Distribution: HIGH: 6, LOW: 44
 - Reason Code Breakdown: general_refresh_review: 44, low_ctr_visible_page: 5, declining_with_demand: 1
 - Output File Written: work/ai_fluency_build_core/outputs/refresh_scout_queue.md
======================================================================
```

---

## 3. Usage Examples

### A. Python SDK / Programmatic Integration
```python
from work.ai_fluency_build_core.flyrank_refresh_scout_agent import FlyRankRefreshScoutAgent

# Initialize autonomous agent
agent = FlyRankRefreshScoutAgent()

# Execute complete 5-step control loop for top 50 candidates
top_candidates, markdown_briefs = agent.run_pipeline(top_n=50)

# Inspect top prioritized candidate
top_item = top_candidates.iloc[0]
print(f"URL: {top_item['content_id']}")
print(f"Decay Probability: {top_item['rf_decay_probability']:.3f}")
print(f"Action Tier: {top_item['suggested_action']}")
print(f"Reason Code: {top_item['reason_code']}")
```

### B. Command-Line Batch Execution
```bash
# Run full model retraining and entire evaluation pipeline
python scripts/run_all.py

# Inspect generated queue briefs
head -n 40 work/ai_fluency_build_core/outputs/refresh_scout_queue.md
```

---

## 4. Architecture & 5-Step Control Loop Sketch

```
┌────────────────────────────────────────────────────────────────────────┐
│             AUTONOMOUS REFRESH SCOUT AGENT CONTROL LOOP                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ Tool 1
┌────────────────────────────────────────────────────────────────────────┐
│  [1] query_content_performance_db(min_age=90, min_impressions=1)       │
│  • Local DuckDB analytical query over 30,000 anonymized rows           │
│  • Enforces data contract (mature URLs, zero leakage exclusions)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ Tool 2
┌────────────────────────────────────────────────────────────────────────┐
│  [2] compute_refresh_score(candidate_records)                          │
│  • Evaluates 52 safe signals with balanced Random Forest ensemble      │
│  • Generates calibrated decay probability (0.00 – 1.00)                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ Tool 3
┌────────────────────────────────────────────────────────────────────────┐
│  [3] assign_operational_reason_codes(decay_score, signals)             │
│  • Maps probabilities into 5 actionable tiers & diagnostic codes       │
│  • E.g., low_ctr_visible_page, declining_with_demand, deep_decay       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ Tool 4
┌────────────────────────────────────────────────────────────────────────┐
│  [4] fetch_serp_context(content_id, primary_keyword)                   │
│  • Retrieves search competitor intent, rank gap, and SERP features     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ Tool 5
┌────────────────────────────────────────────────────────────────────────┐
│  [5] create_draft_refresh_ticket(scored_item, serp_data)               │
│  • Synthesizes structured Markdown ticket with Skeptic Audit Notes     │
│  • Exports to work/ai_fluency_build_core/outputs/refresh_scout_queue.md│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Evaluation Benchmark (v2 Empirical Results)

All models were evaluated using a strict **Client-Holdout Partition** (26 training enterprise clients / 6 held-out test enterprise clients; 27,675 train rows / 2,325 test rows). Holding out entire clients simulates onboarding a brand-new customer organization without cross-tenant signal contamination.

```text
========================================================================================
MODEL COMPARISON MATRIX (Client-Holdout Partition: 26 Train Clients / 6 Test Clients)
========================================================================================
Model Architecture           ROC AUC   Avg Precision   Precision@50   Recall   F1 Score   Lift vs Baseline
----------------------------------------------------------------------------------------
Transparent Rule Baseline     0.627         0.412          0.240       0.450    0.490     1.00× (Ref)
Logistic Regression (Bal)     0.700         0.522          0.400       0.567    0.566     1.67×
Decision Tree (Depth=5)       0.742         0.575          0.620       0.716    0.634     2.58×
Random Forest (200 Trees) 🏆  0.750         0.618          0.740       0.744    0.640     3.08× (~3.1×)
========================================================================================
```

### Key Quantitative Findings:
1. **3.1× Lift Over Baseline Rules:** The Random Forest achieved a **0.740 Precision@50** vs. **0.240** for heuristic age/rank rules on unseen enterprise clients.
2. **Top Predictive Signal:** `days_with_impressions` (13.5% importance) proved to be the single strongest predictor. Pages with sporadic historical impressions have already decayed; pages with consistent historical impressions have the highest traffic at immediate risk.
3. **Leakage Prevention:** Deliberately excluding `trend_direction` and `trend_pct` prevented trivial label memorization (dropping leaky AUC from 0.999 to an honest 0.750).

---

## 6. Ranked Action Playbook & Reason Codes

The agent maps predictions into 5 operational tiers:

| Tier | Urgency & Action | Diagnostic Reason Codes | Economic Strategy | Portfolio Share |
|---|---|---|---|---|
| **Tier 1** | **Refresh & Review CTR** | `low_ctr_visible_page`, `page_one_decay_risk` | High impressions (>1k), low CTR (<0.5%). Fast $10–$25 metadata fix. | 22.2% (6,657 URLs) |
| **Tier 2** | **Full Content Refresh** | `declining_with_demand`, `decay_velocity_high` | Multi-month ranking decay. Requires $150–$500 structural rewrite. | 27.3% (8,178 URLs) |
| **Tier 3** | **Review Engagement UX** | `engagement_bounce_risk`, `short_scroll_depth` | High sessions but low scroll depth/high bounce. UX refactoring. | 6.6% (1,990 URLs) |
| **Tier 4** | **Expand Thin Content** | `thin_content_stagnation` | <1,200 words losing ground to competitor guides. Add sections. | 0.3% (82 URLs) |
| **Tier 5** | **Automated Monitor** | `healthy_momentum` | Stable/growing URLs. Automated 30-day monitoring; zero intervention. | 43.6% (13,093 URLs) |

---

## 7. Limitations & Strict Non-Automation Guardrails

1. **Observational Association, Not Direct Causality:** High model decay scores indicate statistical patterns associated with past decline. Updating an article does not guarantee organic search recovery; search recovery requires controlled experimental validation.
2. **No Black-Box Algorithm Prediction:** The model evaluates lagging observable search telemetry. It does not forecast unannounced Google core algorithm updates or SERP layout modifications.
3. **Strict Non-Automation Guardrails:**
   - ❌ **NEVER** automate automatic URL deletion or unreviewed 301 redirects.
   - ❌ **NEVER** automate AI text rewriting directly to published production CMS without human editorial oversight.
   - ✅ The ML model is a *decision-support triage aid*, not an autonomous publishing robot.

---

## 8. Showcase Demo Video & Walkthrough (3–5 Minutes)

- **Direct Video File (1080p MP4):** [`work/outputs/flyrank_refresh_scout_demo.mp4`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/outputs/flyrank_refresh_scout_demo.mp4)
- **Watch on GitHub:** [https://github.com/mbqayyum/FlyRank_ML_Intern/blob/main/work/outputs/flyrank_refresh_scout_demo.mp4](https://github.com/mbqayyum/FlyRank_ML_Intern/blob/main/work/outputs/flyrank_refresh_scout_demo.mp4)
- **Direct Stream URL:** [https://github.com/mbqayyum/FlyRank_ML_Intern/raw/main/work/outputs/flyrank_refresh_scout_demo.mp4](https://github.com/mbqayyum/FlyRank_ML_Intern/raw/main/work/outputs/flyrank_refresh_scout_demo.mp4)
- **Live Interactive Walkthrough:** [https://mbqayyum.github.io/FlyRank_ML_Intern/#demo](https://mbqayyum.github.io/FlyRank_ML_Intern/#demo)
- **Script & Narration Breakdown:** [`work/ai_fluency_week10/demo_script_and_walkthrough.md`](../ai_fluency_week10/demo_script_and_walkthrough.md)

### Demo Outline:
- **0:00 – 1:00 (The Problem):** 54.2% organic decay rate; 76% false alarms in legacy heuristic rules; $150–$500 wasted refresh cost.
- **1:00 – 2:15 (Live Pipeline Run):** Terminal execution of `run_agent_mvp.py` and `scripts/run_all.py` showing DuckDB query and 5-tool control loop in <4s.
- **2:15 – 3:15 (Headline Results):** 0.740 Precision@50 (3.1× lift) on held-out clients; `days_with_impressions` as primary signal.
- **3:15 – 4:15 (Design Decision & Honest Limitation):** Client-holdout validation vs. random splits explained; observational correlation vs. causal recovery limitation explained on camera.
- **4:15 – 5:00 (5-Tier Playbook & Wrap-up):** Actionable editorial queue walkthrough and live deployed portfolio demonstration.

---

## 9. Deliverables & File Index

| Deliverable | File Path | Description |
|---|---|---|
| **Agent Engine Class** | [`flyrank_refresh_scout_agent.py`](./flyrank_refresh_scout_agent.py) | 5-tool autonomous agent control loop |
| **CLI Runner** | [`run_agent_mvp.py`](./run_agent_mvp.py) | End-to-end executable entry point |
| **Output Queue Briefs** | [`outputs/refresh_scout_queue.md`](./outputs/refresh_scout_queue.md) | Top 50 generated markdown tickets |
| **Agent Design Spec** | [`agent_design_spec.md`](./agent_design_spec.md) | Agent design specification document |
| **Build & Run Log** | [`build_log.md`](./build_log.md) | Chronological development and iteration log |
| **Execution Capture** | [`raw_run_capture.md`](./raw_run_capture.md) | Verifiable raw terminal execution capture |
| **Workflow Engine** | [`no_code_workflow.md`](./no_code_workflow.md) | Chained No-Code research pipeline |

---

## License & Acknowledgments
- **Author:** Muhammad Burhan Qayyum (M. B. Qayyum) · FlyRank AI & ML Engineering Track
- **License:** MIT License (see [`LICENSE`](../../LICENSE))
- **Data Credit:** Built on the **FlyRank ML Internship dataset** ([https://flyrank.ai](https://flyrank.ai/)).
