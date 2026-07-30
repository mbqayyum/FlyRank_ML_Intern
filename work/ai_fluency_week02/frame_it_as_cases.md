# AI Fluency Week 2: Frame Your Work — Frame It as Cases

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Week 2)
- **Assignment URL:** [https://aifluency.flyrank.ai/week-02.html#frame-it-as-cases](https://aifluency.flyrank.ai/week-02.html#frame-it-as-cases)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** July 2026

---

## 1. The Voice Card

> **Voice Card:** `Direct, technical, honest, grounded, concise, plain.`

*(6 words. Added as standing instructions in the `FlyRank-Search-ML-Portfolio` Claude Project).*

---

## 2. Before / After Comparison (Generic AI vs. Edited Sharp Copy)

| Section | Generic AI Output (Before) | Edited Sharp Version (After) | Why the Change Matters |
|---|---|---|---|
| **Problem Statement** | "Leveraging cutting-edge Machine Learning and state-of-the-art algorithms, I engineered a game-changing predictive solution to optimize content decay and drive maximum search visibility." | "Content teams managing 10,000+ pages face a budget dilemma: 54% of pages lose search traffic each month, but refreshing an article costs $150–$500. Blanket age rules waste budget on stable pages while missing steep drops." | Replaced meaningless hype ("cutting-edge", "game-changing") with concrete operational numbers ($150–$500 per article, 54% decline rate). |
| **Method & Decisions** | "I trained multiple powerful AI models utilizing advanced feature engineering to forecast future rankings." | "I trained a Random Forest model on 30,000 pseudonymized pages using a client-holdout split (~20% of clients held out). I explicitly excluded trend percentages to prevent label leakage." | Names the exact model (Random Forest), dataset size (30k pages), split strategy (client-holdout), and data safety decision (leakage prevention). |
| **Results** | "The model achieved outstanding accuracy and dramatically outperformed traditional methods to maximize ROI." | "On unseen clients, the model achieved a Precision@50 of 0.740 and an ROC AUC of 0.750 — a 3.1× lift over a transparent 4-component hand-rule baseline (0.240)." | Swapped vague praise ("outstanding accuracy") for verifiable metrics (0.740 Precision@50 vs 0.240 baseline). |
| **Limitations** | "Our solution is highly robust and guaranteed to deliver top rankings across all search engines." | "This model identifies observed correlations in lagging panel data; it does not prove causal refresh recovery, predict search engine algorithm changes, or guarantee ROI." | Eliminates false promises and establishes credibility by explicitly stating model boundaries. |

---

## 3. Case Study: FlyRank Search Content Refresh Opportunity Scoring

### Beat 1: The Problem
Content teams managing large portfolios must decide which pages to refresh first when search traffic drops. In a dataset of 30,000 pseudonymized pages across 32 clients, **54.2% of pages are actively declining in search impressions** (>20% drop month-over-month), representing ~80M impressions at risk.

The naive rule — "refresh anything older than 180 days" — ignores traffic momentum, keyword opportunity, and content quality. It treats stable legacy pages the same as pages hemorrhaging traffic. At $150–$500 per article refresh, guessing wastes editing budget on pages that don't need attention while letting high-value decliners slip permanently.

### Beat 2: What I Did & Decided
I built a machine-learning scoring and ranking system that orders pages by estimated refresh priority using 26 safe signals (18 numeric, 8 categorical):

1. **Explicit Leakage Prevention:** The label is `is_declining_label = (trend_direction == "down")`. I deliberately excluded `trend_direction` and `trend_pct` from all feature lists. (Including `trend_pct` yields a leaky 0.999 AUC; removing it ensures honest training).
2. **Client-Holdout Validation:** Rather than a random row split (which allows models to memorize client-specific traits), I held out ~20% of *clients* entirely. The model is evaluated strictly on clients it has never seen.
3. **Model Selection & Baseline Comparison:** Built a 4-component hand-rule baseline (Visibility 40%, Freshness Risk 30%, Position Opportunity 25%, Depth Gap 5%) and evaluated 3 classifiers (Logistic Regression, Decision Tree, Random Forest) against it on the same held-out split.
4. **Action Playbook & Reason Codes:** Mapped probabilities into 5 action tiers (`refresh_and_review_ctr`, `refresh`, `refresh_and_review_engagement`, `expand_and_refresh`, `monitor`) with human-readable reason codes (e.g., `declining_with_demand`, `page_one_decay_risk`).

### Beat 3: What Came of It
- **3.1× Lift Over Hand-Rules:** On held-out clients, the Random Forest model achieved a **Precision@50 of 0.740** compared to the baseline's **0.240** (and against a 54.2% majority-class base rate).
- **ROC AUC of 0.750:** Demonstrates solid discriminative power across unseen clients.
- **Top Predictor Identified:** `days_with_impressions` (impression consistency) was the single strongest feature (importance: 0.158), proving that pages with stable, high historical visibility have the most traffic at risk.
- **Decision-Support Queue:** Generated a prioritized queue of 30,000 pages, flagging 3,605 high-confidence pages for immediate editorial review.
- **Honest Framing:** Explicitly documented that results are observational (not causal) and provide decision-support for editors, not automated publishing.

---

## 4. Bio Copy (For Hero / Landing Page)

> I build machine learning models and decision-support systems for search data. My work focuses on building models on real, messy panel datasets while strictly preventing feature leakage and validating on held-out clients. I write clear technical research papers that explain model logic, baseline comparisons, and explicit limits without hype.

---

## 5. Contact & CTA Copy (For Contact Page & Hero Footer)

### Primary Call-to-Action (CTA)
> **Headline:** Interested in operationalizing refresh scoring for your search portfolio?  
> **Body:** Read the full deployed research paper to inspect the client-holdout methodology, feature importance breakdowns, and action playbook. If you manage search content at scale, let's talk.  
> **Button:** `Read Research Paper & Book 15-Min Call`

### Direct Contact Copy
> **Email:** `m.b.qayyum` (via repository)  
> **GitHub:** [github.com/mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)  
> **Live Paper:** [mbqayyum.github.io/FlyRank_ML_Intern](https://mbqayyum.github.io/FlyRank_ML_Intern/)

---

## 6. Evaluation Checklist (Pass / Revise)

| Requirement | Status | Evidence |
|---|---|---|
| **Voice Card Included** | ✅ PASS | `Direct, technical, honest, grounded, concise, plain` placed at top. |
| **Framed Cases for Sitemap** | ✅ PASS | Case study created for Capstone Research Paper (`/paper`), Bio for Hero (`/`), and Contact/CTA copy for Booking (`/contact`). |
| **Three Beats Present** | ✅ PASS | Case study clearly structured into *The Problem*, *What I Did & Decided*, and *What Came of It*. |
| **Before / After Comparison** | ✅ PASS | Table showcasing generic AI fluff vs. edited sharp copy across 4 sections. |
| **No Buzzword Filler** | ✅ PASS | Cut all terms like "results-driven", "cutting-edge", "game-changing". Uses exact metrics ($150–$500, 0.740 P@50, 3.1× lift). |
| **Target Audience & Action** | ✅ PASS | Points directly to Head of SEO / Product Lead and CTA to book a 15-min call. |
