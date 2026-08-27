# FlyRank Search Intelligence: Content Refresh Prioritization System

[![Live Deployed Paper](https://img.shields.io/badge/Live_Paper-Deployed_GitHub_Pages-success?style=for-the-badge&logo=github)](https://mbqayyum.github.io/FlyRank_ML_Intern/)
[![Credential Verification](https://img.shields.io/badge/FlyRank_Credential-FR--ML--2026--QAYYUM-54E399?style=for-the-badge&logo=shield)](https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.)
[![Python Version](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12%20%7C%203.13%20%7C%203.14-blue?style=for-the-badge&logo=python)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Research Question:** *Which measurable content and search signals are associated with pages declining in search visibility, and can a supervised machine-learning model prioritize them for refresh more effectively than transparent hand-rules?*

---

## 1. What This System Does & For Whom

In enterprise organic search portfolios managing thousands of indexed URLs, over **54.2% of published content experiences ongoing search performance decay**. Editorial and SEO engineering teams cannot afford to audit or rewrite every URL ($150–$500 in wasted editorial cost per false alarm).

This repository contains an end-to-end **Machine Learning Prioritization System and Autonomous Triage Agent** built on **30,000 anonymized search URLs across 32 enterprise clients** (drawn from FlyRank's 79-million-row production warehouse).

### Who It Is For:
- **Content Strategists & Editors:** Replaces arbitrary hand-rules with an explainable 5-tier ranked action playbook and diagnostic reason codes.
- **Search Engineering & Data Teams:** Provides a leak-free, reproducible ML evaluation pipeline with strict client-holdout validation.
- **Autonomous AI Agents:** Operates a 5-step control loop (*FlyRank Refresh Scout*) generating structured markdown triage briefs for human review.

---

## 2. Quickstart & Reproducibility (Setup a Stranger Can Follow)

Follow these exact steps from a clean terminal to clone, set up, and reproduce the entire pipeline in **under 10 seconds**:

### Prerequisites
- Python 3.10+ (tested on Python 3.10 through 3.14)
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

# 3. Install core dependencies
pip install -r requirements.txt

# 4. Run the end-to-end pipeline (Data prep -> Baseline -> Models -> Evaluation -> Action Playbook)
python scripts/run_all.py
```

### Expected Output
```text
===========================================================================
MODEL COMPARISON (Client-Holdout Partition: 26 Train / 6 Test Clients)
===========================================================================
                     ROC AUC  Avg Precision  Precision@50  Recall     F1
Logistic Regression    0.700          0.522          0.40   0.567  0.566
Decision Tree          0.742          0.575          0.62   0.716  0.634
Random Forest          0.750          0.618          0.74   0.744  0.640
===========================================================================
Baseline (hand-rules): Precision@50 ≈ 0.240, ROC AUC ≈ 0.627
🏆 Best: Random Forest -> Precision@50 = 0.740 (~3.1× lift over baseline)
```

All generated queue files, figures, and markdown receipts are exported to `work/outputs/` and `work/figures/`.

---

## 3. Architecture & Control Loop Sketch

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA PREPARATION & CONTRACT                     │
│  30,000 Pages (32 Clients) ──> 52 Engineered Features ──> Exclude Leakage
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  LEAK-FREE CLIENT-HOLDOUT PARTITION                    │
│  26 Training Clients (27,675 rows)  │  6 Held-Out Test Clients (2,325) 
└─────────────────┬─────────────────┴──────────────────┬─────────────────┘
                  │                                    │
                  ▼                                    ▼
┌───────────────────────────────────┐  ┌─────────────────────────────────┐
│     SUPERVISED MODEL TRAINING     │  │      EVALUATION BENCHMARK       │
│  • Balanced Random Forest         │──│  • Precision@50: 0.740 (3.1×)   │
│  • Decision Tree (Depth=5)        │  │  • ROC-AUC: 0.750               │
│  • Balanced Logistic Regression   │  │  • Rule Baseline: 0.240 P@50    │
└─────────────────┬─────────────────┘  └─────────────────────────────────┘
                  │
                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│               5-TIER ACTION PLAYBOOK & REASON CODES                    │
│  Tier 1: CTR Quick-Wins (22.2%)   │ Tier 4: Expand Thin Content (0.3%) │
│  Tier 2: Core Refactor (27.3%)    │ Tier 5: Automated Monitor (43.6%)  │
│  Tier 3: Engagement UX (6.6%)     │                                    │
└─────────────────┬──────────────────────────────────────────────────────┘
                  │
                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│         AUTONOMOUS AGENT CONTROL LOOP (Refresh Scout Agent)            │
│  DuckDB Pull ──> ML Decay Score ──> Reason Code ──> Skeptic Markdown   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Empirical Evaluation Benchmark (v2 Eval Results)

All models were evaluated on the **same held-out test clients** (test base rate: 39.1% declining):

| Model Architecture | ROC AUC | Avg Precision | Precision@50 | Recall | F1 Score | Lift vs Heuristic Baseline |
|---|---|---|---|---|---|---|
| **Transparent Rule Baseline** | 0.627 | 0.412 | 0.240 | 0.450 | 0.490 | 1.00× (Reference) |
| **Logistic Regression (Balanced)** | 0.700 | 0.522 | 0.400 | 0.567 | 0.566 | 1.67× |
| **Decision Tree (Depth=5)** | 0.742 | 0.575 | 0.620 | 0.716 | 0.634 | 2.58× |
| **Random Forest (200 Trees) 🏆** | **0.750** | **0.618** | **0.740** | **0.744** | **0.640** | **3.08× (~3.1× Lift)** |

### Top Predictive Signals
1. `days_with_impressions` (13.5% feature importance) — Impression consistency is the #1 predictor of sustained decline.
2. `log_impressions_90d` (12.9% feature importance) — Established volume baseline.
3. `avg_position` (10.9% feature importance) — Ranking position stability.
4. `content_age_days` (9.2% feature importance) — Time since initial publication.

---

## 5. Limitations & Honest Framing

1. **Observational, Not Causal:** The model identifies statistical correlations with past search decay. Refreshing an article does not guarantee rank recovery; search recovery requires controlled experimental validation.
2. **No Black-Box Algorithm Prediction:** The model evaluates lagging observable search telemetry. It does not forecast unreleased Google algorithm updates or SERP layout overhauls.
3. **Cohort Boundaries:** Calibrated on a 32-enterprise client panel. Niche B2C verticals with extreme seasonality require custom threshold tuning.
4. **Strict Non-Automation Guardrails:** Never automate destructive editorial operations (page deletion, canonical redirects, or unreviewed AI content regeneration). The ML model is a *reviewer triage aid*, not an autonomous publishing robot.

---

## 6. AI Transparency Diligence Statement

In accordance with the **AI Fluency Transparency Diligence Framework**:
- **What Was Built With AI Assistance:** AI coding assistants (Antigravity IDE & Claude) were used as thinking and pair-programming partners for scaffolding test scripts, generating SVG visualization templates, structuring docstrings, and drafting initial markdown skeletons.
- **What Was Checked & Verified Manually:** All mathematical formulations, feature leakage exclusions (`trend_direction`), DuckDB data queries, client-holdout split logic, ROC-AUC / Precision@50 metrics, and claim ladder compliance were independently verified, executed, and validated by the author.

---

## 7. Master Deliverables Directory & Repository Index

- 📄 **Live Deployed Research Paper:** [https://mbqayyum.github.io/FlyRank_ML_Intern/](https://mbqayyum.github.io/FlyRank_ML_Intern/)
- 📋 **Submission URL Pointer:** [`submission/paper_url.txt`](./submission/paper_url.txt)
- 📓 **Capstone Reproducibility Notebook:** [`work/notebooks/capstone.ipynb`](./work/notebooks/capstone.ipynb)
- 📊 **Action Playbook Notebook:** [`work/notebooks/w07_action_playbook.ipynb`](./work/notebooks/w07_action_playbook.ipynb)
- 🗺️ **Master Deliverable Index (Weeks 1–10):** [`work/ai_fluency_week10/MASTER_DELIVERABLE_INDEX.md`](./work/ai_fluency_week10/MASTER_DELIVERABLE_INDEX.md)
- 📝 **Capstone Retrospective (500–800 words):** [`work/ai_fluency_week10/RETROSPECTIVE.md`](./work/ai_fluency_week10/RETROSPECTIVE.md)
- ⏱️ **Verified Hours Log:** [`work/ai_fluency_week10/HOURS_LOG_SUMMARY.md`](./work/ai_fluency_week10/HOURS_LOG_SUMMARY.md)
- 📣 **Build-in-Public Story:** [`work/ai_fluency_week10/BUILD_IN_PUBLIC_POST.md`](./work/ai_fluency_week10/BUILD_IN_PUBLIC_POST.md)
- 🎬 **Showcase Demo Script:** [`work/ai_fluency_week10/demo_script_and_walkthrough.md`](./work/ai_fluency_week10/demo_script_and_walkthrough.md)

---

## License & Acknowledgments
- **License:** MIT License (see [`LICENSE`](./LICENSE))
- **Data Credit:** Built on the **FlyRank ML Internship dataset** ([https://flyrank.ai](https://flyrank.ai/)).
- **Track Author:** M. B. Qayyum · Spring 2026 FlyRank AI & ML Engineering Cohort.
