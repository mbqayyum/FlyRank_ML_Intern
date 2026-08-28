# Capstone Research Paper: Content Refresh Opportunity Scoring
## Machine Learning vs. Transparent Hand-Rules on 79M Search Logs

- **Author:** Muhammad Burhan Qayyum (M. B. Qayyum)
- **Track:** FlyRank AI Internship · Machine Learning Track (Capstone)
- **Lane:** Refresh / Content Opportunity Scoring (Lane 2)
- **Live Deployed Paper:** [https://mbqayyum.github.io/FlyRank_ML_Intern/](https://mbqayyum.github.io/FlyRank_ML_Intern/)
- **Target Subdomain:** `mbqayyum.flyrank.ai`
- **Official Credential Verification:** [FR-ML-2026-QAYYUM Credential](https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** August 2026

---

## 1. Title + Abstract

> **Abstract:**
> Which measurable content and search signals predict pages declining in organic search visibility, and can a machine-learning model prioritize them for refresh more effectively than transparent hand-rules? Using a 30,000-page anonymized production search dataset across 32 enterprise clients drawn from a 79-million-row warehouse release, we engineered 52 signals spanning visibility consistency, decay velocity, and reader engagement. We designed a leak-free client-holdout validation protocol (26 training clients, 6 held-out test clients) and benchmarked a balanced Random Forest against Decision Trees, Logistic Regression, and rule-based heuristics. The Random Forest achieved an ROC-AUC of 0.750 and a Precision@50 of 0.740, delivering a **3.1× precision lift** over transparent baseline rules (0.240) on held-out clients. We translated these predictions into an operational 5-tier ranked action playbook that prioritizes editorial interventions, establishes cost/value economic triage, and defines strict human-in-the-loop governance for what must never be automated.

---

## 2. Introduction & Problem Statement

Enterprise organic search portfolios managing thousands of indexed URLs face a continuous resource-allocation dilemma: in typical multi-client search portfolios, over **54.2% of published content is actively decaying in organic visibility** (>20% month-over-month decline).

Editorial and content marketing teams cannot afford to audit or rewrite every URL. A manual content refresh costs **$150–$500 per article** in editorial, design, and subject-matter-expert overhead:
- **False Positives (Wasted Budget):** Rewriting a healthy or stable article wastes $150–$500 on content that did not need intervention.
- **False Negatives (Compounding Revenue Loss):** Missing a steep organic decline allows competing websites to seize top-3 ranking positions, permanently eroding organic traffic and conversions.

### The Incumbent Rule Baseline Problem
Industry teams traditionally rely on naive heuristic filters (e.g., flagging any page older than 180 days with average position > 15). Under rigorous client-holdout evaluation, these static rules achieve only **0.240 Precision@50**—meaning **76% of flagged articles are false alarms**.

### The Machine Learning Opportunity
By training supervised ensemble models on multi-dimensional search signals—specifically capturing impression consistency (`days_with_impressions`), CTR velocity, and engagement drop-offs—we identify true decay signatures with **0.740 Precision@50**, tripling editorial triage efficiency.

---

## 3. Data Description & Public-Safety Governance

This research is conducted on the **FlyRank 2026 Production Search Dataset**, capturing 30,000 anonymized page-level panel records across 32 enterprise clients extracted from a 79-million-row warehouse release.

### A. Inclusion Criteria & Data Contract
- **Content Age:** Minimum 90 days (`content_age_days >= 90`) to establish a stable statistical ranking baseline.
- **Search Visibility:** Positive 90-day search impressions (`impressions_90d > 0`).
- **Deduplication:** Unique per `content_id` (30,000 unique rows).

### B. Public-Safety & Strict Leakage Exclusions
To guarantee zero target leakage and strict public safety:
1. **Target-Correlated Fields:** `trend_direction` and `trend_pct` were deliberately excluded from all feature matrices. (Including `trend_pct` produces an artificially leaky 0.999 AUC; removing it ensures honest training).
2. **Entity Identifiers:** `client_id` and `content_id` were used strictly for holdout partitioning and grouping, never as predictive features.
3. **Editorial Metadata:** `provider_used` and `model_used` were excluded to prevent confounding AI generation vendors with search performance dynamics.
4. **Public Anonymization:** No client names, domain URLs, raw search queries, or internal credentials appear anywhere in this research.

---

## 4. Methodology & Experimental Design

### A. Feature Matrix Architecture (52 Signals)
The feature vector spans 52 leak-free signals:
- **18 Continuous Numeric Features:** Log-transformed search volume (`log_impressions_90d`, `log_clicks_90d`), impression consistency (`days_with_impressions`), rank stability (`avg_position`, `position_std`), click-through rate (`ctr`), and reader engagement (`scroll_depth_mean`, `engagement_rate`, `dwell_time_seconds`).
- **8 Categorical Features (One-Hot Encoded into 34 Binary Signals):** Content archetypes (how-to, guide, comparison, listicle), search intent types (informational, commercial, transactional), freshness decay tiers, and competition level.

### B. Supervised Target Definition
$$\text{is\_declining\_label} = \begin{cases} 1 & \text{if } \text{trend\_direction} = \text{"down"} \\ 0 & \text{otherwise} \end{cases}$$
Base rate in full dataset: **54.2% declining**. Base rate in test partition: **39.1% declining**.

### C. The Transparent 4-Condition Rule Baseline
We constructed an interpretable industry rule baseline:
$$\text{Rule Baseline} = (\text{content\_age\_days} \ge 180) \land (\text{avg\_position} \ge 15) \land (\text{impressions\_90d} \ge 1000) \land (\text{ctr} < 0.02)$$

### D. Leak-Free Client-Holdout Validation Partition
To evaluate real-world generalization:
- **Training Clients (26 Clients, 27,675 rows):** Used strictly for feature standardization and model fitting.
- **Held-Out Test Clients (6 Clients, 2,325 rows):** Kept completely isolated during training.
- **Why Client Holdout Matters:** Random row splits allow models to "cheat" by memorizing shared client domain authority and sitewide backlink equity. Client holdout evaluates how the model performs when deployed to an entirely new customer organization.

---

## 5. Results & Empirical Benchmark

All models were evaluated on the identical held-out test client set (test base rate: 39.1% declining):

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

### Key Quantitative Takeaways:
1. **3.1× Lift Over Baseline Rules:** Random Forest achieved **0.740 Precision@50** (37 of top 50 are true decliners) vs. **0.240** for heuristic age/rank rules (only 12 of top 50 are true decliners).
2. **Top Predictive Signal (`days_with_impressions` — 13.5% importance):** Impression consistency was the #1 predictor of decay. Pages with sporadic visibility have already bottomed out; pages with consistent historical impressions have the highest traffic at active risk of being lost to competitors.
3. **Established Volume (`log_impressions_90d` — 12.9% importance):** High historical search demand amplifies the urgency of decay mitigation.

---

## 6. Limitations & Honest Framing

1. **Observational, Not Causal:** This research identifies statistical associations with past search decay. Updating an article does not guarantee organic rank recovery; search recovery requires controlled experimental validation.
2. **No Black-Box Algorithm Prediction:** The model evaluates lagging observable search telemetry. It does not predict unannounced Google algorithm updates or SERP layout overhauls.
3. **Cohort Boundaries:** Calibrated on a 32-enterprise client panel. Extreme B2C seasonality requires vertical-specific threshold tuning.
4. **Strict Non-Automation Guardrails:**
   - ❌ **NEVER** automate automatic URL deletion or unreviewed 301 redirects.
   - ❌ **NEVER** automate AI text rewriting directly to published production CMS without human editorial oversight.
   - ✅ The ML model is an *editorial decision-support triage aid*, not an autonomous publishing robot.

---

## 7. Ranked Recommendations: 5-Tier Action Playbook

| Tier | Urgency & Action | Diagnostic Reason Codes | Economic Strategy | Portfolio Share |
|---|---|---|---|---|
| **Tier 1** | **Refresh & Review CTR** | `low_ctr_visible_page`, `page_one_decay_risk` | High impressions (>1k), low CTR (<0.5%). Fast $10–$25 metadata fix. | 22.2% (6,657 URLs) |
| **Tier 2** | **Full Content Refresh** | `declining_with_demand`, `decay_velocity_high` | Multi-month ranking decay. Requires $150–$500 structural rewrite. | 27.3% (8,178 URLs) |
| **Tier 3** | **Review Engagement UX** | `engagement_bounce_risk`, `short_scroll_depth` | High sessions but low scroll depth/high bounce. UX refactoring. | 6.6% (1,990 URLs) |
| **Tier 4** | **Expand Thin Content** | `thin_content_stagnation` | <1,200 words losing ground to competitor guides. Add sections. | 0.3% (82 URLs) |
| **Tier 5** | **Automated Monitor** | `healthy_momentum` | Stable/growing URLs. Automated 30-day monitoring; zero intervention. | 43.6% (13,093 URLs) |

---

## 8. Reproducibility & Open Source Pipeline

The entire research pipeline is 100% reproducible with fixed random seed (`RANDOM_STATE = 42`):

### Quick Execution
```bash
# Clone repository
git clone https://github.com/mbqayyum/FlyRank_ML_Intern.git
cd FlyRank_ML_Intern

# Setup virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows (or source .venv/bin/activate on Linux/macOS)

# Install dependencies
pip install -r requirements.txt

# Run end-to-end pipeline in <10 seconds
python scripts/run_all.py

# Run Autonomous Agent MVP
python work/ai_fluency_build_core/run_agent_mvp.py
```

### Core Notebooks & Artifacts:
- 📓 **Capstone Reproducibility Notebook:** [`work/notebooks/capstone.ipynb`](notebooks/capstone.ipynb)
- 📊 **Action Playbook Notebook:** [`work/notebooks/w07_action_playbook.ipynb`](notebooks/w07_action_playbook.ipynb)
- 🤖 **Autonomous Refresh Scout Agent:** [`work/ai_fluency_build_core/flyrank_refresh_scout_agent.py`](ai_fluency_build_core/flyrank_refresh_scout_agent.py)
- 🎬 **Showcase Demo Video:** [https://youtu.be/PCrmfC9vPJ4](https://youtu.be/PCrmfC9vPJ4)

---

## 9. Acknowledgments & Data Credit

Built on the **FlyRank ML Internship dataset**. Sincere gratitude to the FlyRank Research and Data Infrastructure teams for providing access to the 79-million-row production search telemetry warehouse, client anonymization tooling, and mentorship.

- **Data Credit:** [https://flyrank.ai](https://flyrank.ai/)
- **Official Credential:** [FR-ML-2026-QAYYUM Verification](https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.)
