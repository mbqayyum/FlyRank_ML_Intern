# AI Fluency Week 2: Build a Prompt Ladder

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Week 2)
- **Assignment URL:** [https://aifluency.flyrank.ai/week-02.html#build-a-prompt-ladder](https://aifluency.flyrank.ai/week-02.html#build-a-prompt-ladder)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** July 2026

---

## 1. Overview & Method

This document demonstrates **prompt engineering discipline** through an iterative 6-run prompt ladder (Baseline + 5 single-layer additions). Each version adds **exactly one layer** to address the previous output's primary failure. Every run includes output excerpts and 4 diagnostic notes focusing on **what changed in the output**.

---

## 2. The 6 Prompt Runs

### Run 0: Weak Baseline (V0)

#### Prompt
```text
Analyze my search content data and tell me which pages to refresh.
```

#### Output Excerpt
> "To analyze your search content data and identify pages to refresh, follow these steps:
> 1. Check your Google Analytics for pages with low traffic.
> 2. Look for old articles published over 6 months ago.
> 3. Update your titles and meta descriptions to improve CTR.
> 4. Add new keywords and ensure high content quality.
> 5. Monitor performance regularly."

#### 4 Diagnostic Notes
1. **What changed in prompt:** Baseline (no engineered layers).
2. **What actually improved in output:** N/A (baseline run).
3. **What failed in output:** Generic textbook bullet points. Gives generic advice that any blog post offers; knows nothing about my dataset, metrics, or target audience.
4. **What to try next:** Add Layer 1 — Defined Audience (Head of SEO).

---

### Run 1: Version 1 (+ Layer: Defined Audience)

#### Prompt
```text
Analyze my search content data and tell me which pages to refresh. 
My target reader is a Head of SEO at a growth-stage content platform who needs to allocate finite editing budget efficiently.
```

#### Output Excerpt
> "For a Head of SEO prioritizing editorial budget, you should focus on pages where traffic loss represents real business risk. You need to calculate the opportunity cost of article rewrites vs. ROI. Focus on pages that have high organic potential but are currently losing impressions..."

#### 4 Diagnostic Notes
1. **What changed in prompt:** Added **Defined Audience** (*Head of SEO at growth-stage platform allocating editing budget*).
2. **What actually improved in output:** The tone shifted from generic advice to business economics — it started mentioning ROI, editorial budget allocation, and business risk instead of "update your titles."
3. **What failed in output:** Still completely abstract. It gives no specific thresholds, columns, dataset sizes, or mathematical scoring methods because it lacks data context.
4. **What to try next:** Add Layer 2 — Real Context & Data Contract.

---

### Run 2: Version 2 (+ Layer: Real Context & Data Contract)

#### Prompt
```text
Analyze my search content data and tell me which pages to refresh. 
My target reader is a Head of SEO at a growth-stage content platform who needs to allocate finite editing budget efficiently.
Context: The dataset contains 30,000 pseudonymized content pages across 32 clients. 54.2% of pages are in active decline (>20% impression drop month-over-month). Features include impressions_90d, clicks_90d, sessions_90d, avg_position, ctr, content_age_days, days_since_last_update, and word_count.
```

#### Output Excerpt
> "Based on your 30,000-page dataset across 32 clients where 54.2% are declining:
> To find refresh candidates, sort your data by `trend_pct` where trend is < -20%. Then filter for high `impressions_90d` and high `days_since_last_update`. This will immediately show you the pages that lost the most traffic."

#### 4 Diagnostic Notes
1. **What changed in prompt:** Added **Real Context & Data Contract** (30k rows, 32 clients, 54.2% base rate, specific column names).
2. **What actually improved in output:** The output cited exact column names (`impressions_90d`, `days_since_last_update`) and referenced the 54.2% decline rate.
3. **What failed / MADE IT WORSE (Honest failure moment):** 🚨 **Label Leakage Failure!** The AI suggested sorting by `trend_pct < -20%` as a feature. Using the trend comparison column to predict decline is direct label leakage — it's filtering on the outcome rather than building a predictive model.
4. **What to try next:** Add Layer 3 — Negative Constraints & Leakage Control.

---

### Run 3: Version 3 (+ Layer: Negative Constraints & Leakage Control)

#### Prompt
```text
Analyze my search content data and tell me which pages to refresh. 
My target reader is a Head of SEO at a growth-stage content platform who needs to allocate finite editing budget efficiently.
Context: The dataset contains 30,000 pseudonymized content pages across 32 clients. 54.2% of pages are in active decline (>20% impression drop month-over-month). Features include impressions_90d, clicks_90d, sessions_90d, avg_position, ctr, content_age_days, days_since_last_update, and word_count.
Constraints: Do NOT use trend_pct or trend_direction as model features (that is label leakage). Do NOT make causal claims or say 'predicting Google'. Do NOT use generic marketing buzzwords.
```

#### Output Excerpt
> "To build a non-leaky decision model, exclude `trend_pct` and `trend_direction` entirely. Instead, train a classifier on lagging signals (`days_with_impressions`, `log_impressions_90d`, `avg_position`, `content_age_days`). This outputs an observed decline probability without leaking the target window. Note: this provides decision-support rankings based on observed correlations, not causal proof of refresh recovery."

#### 4 Diagnostic Notes
1. **What changed in prompt:** Added **Negative Constraints** (prohibited label leakage columns `trend_pct`/`trend_direction`, banned causal claims, banned marketing buzzwords).
2. **What actually improved in output:** The output eliminated the leaky suggestion, explicitly warned against label leakage, and adopted disciplined "observed correlation / decision-support" language.
3. **What failed in output:** The output was delivered as unstructured prose paragraphs — hard for a busy Head of SEO to scan or operationalize in 30 seconds.
4. **What to try next:** Add Layer 4 — Specified Output Format & Structure.

---

### Run 4: Version 4 (+ Layer: Specified Output Format)

#### Prompt
```text
Analyze my search content data and tell me which pages to refresh. 
My target reader is a Head of SEO at a growth-stage content platform who needs to allocate finite editing budget efficiently.
Context: The dataset contains 30,000 pseudonymized content pages across 32 clients. 54.2% of pages are in active decline (>20% impression drop month-over-month). Features include impressions_90d, clicks_90d, sessions_90d, avg_position, ctr, content_age_days, days_since_last_update, and word_count.
Constraints: Do NOT use trend_pct or trend_direction as model features (that is label leakage). Do NOT make causal claims or say 'predicting Google'. Do NOT use generic marketing buzzwords.
Specified Output Format: Format output as an Executive Decision Table with 5 action tiers (Refresh & Review CTR, Refresh, Refresh & Review Engagement, Expand & Refresh, Monitor), showing reason codes, volume %, and operational editor action for each.
```

#### Output Excerpt
> | Tier | Action | Volume % | Reason Codes | Operational Editor Action |
> |---|---|---|---|---|
> | 1 | Refresh & Review CTR | 22% | `low_ctr_visible_page`, `ctr_review_candidate` | Rewrite titles/meta descriptions for visible pages with CTR < 0.5%. |
> | 2 | Refresh | 27% | `declining_with_demand`, `model_decline_risk` | Update content depth and internal links for high-impression decliners. |
> | 3 | Refresh & Review Engagement | 7% | `low_engagement_visible_page` | Improve UX and structure for pages with sessions ≥30 but scroll rate < 30%. |
> | 4 | Expand & Refresh | <1% | `thin_visible_page` | Expand content depth on thin pages (<1,200 words) with high visibility. |
> | 5 | Monitor | 44% | `general_refresh_review` | Re-score monthly; no immediate edit needed. |

#### 4 Diagnostic Notes
1. **What changed in prompt:** Added **Specified Output Format** (Executive Decision Table with 5 action tiers, reason codes, volume %, and editor actions).
2. **What actually improved in output:** The unstructured text was replaced with a scan-ready Markdown table mapping model probabilities into concrete editorial workflows.
3. **What failed in output:** The table lacks verification metrics — it doesn't prove *why* a machine learning model is better than a simple hand-rule or show validation numbers.
4. **What to try next:** Add Layer 5 — Verification Criteria & Baseline Benchmark.

---

### Run 5: Version 5 (+ Layer: Verification & Baseline Benchmark)

#### Prompt
```text
Analyze my search content data and tell me which pages to refresh. 
My target reader is a Head of SEO at a growth-stage content platform who needs to allocate finite editing budget efficiently.
Context: The dataset contains 30,000 pseudonymized content pages across 32 clients. 54.2% of pages are in active decline (>20% impression drop month-over-month). Features include impressions_90d, clicks_90d, sessions_90d, avg_position, ctr, content_age_days, days_since_last_update, and word_count.
Constraints: Do NOT use trend_pct or trend_direction as model features (that is label leakage). Do NOT make causal claims or say 'predicting Google'. Do NOT use generic marketing buzzwords.
Specified Output Format: Format output as an Executive Decision Table with 5 action tiers (Refresh & Review CTR, Refresh, Refresh & Review Engagement, Expand & Refresh, Monitor), showing reason codes, volume %, and operational editor action for each.
Verification Criteria: Evaluate the model on a client-holdout split (~20% of clients held out). Compare model Precision@50 and ROC AUC against a transparent 4-component hand-rule baseline. Quantify the precision lift and state base-rate context explicitly.
```

#### Output Excerpt
> **Executive Summary & Verification:**
> Evaluated on a held-out split of unseen clients (~20% client holdout), the Random Forest model achieves a **Precision@50 of 0.740** and an **ROC AUC of 0.750**, compared to the 4-component hand-rule baseline (**Precision@50 = 0.240**, ROC AUC = 0.627). This represents a **3.1× precision lift** over hand-rules and a 1.37× lift over the 54.2% majority-class base rate.
> 
> | Tier | Action | Volume % | Reason Codes | Precision@50 | Operational Editor Action |
> |---|---|---|---|---|---|
> | 1 | Refresh & Review CTR | 22% | `low_ctr_visible_page`, `ctr_review_candidate` | 0.740 | Rewrite titles/meta descriptions for visible pages with CTR < 0.5%. |
> | 2 | Refresh | 27% | `declining_with_demand`, `model_decline_risk` | 0.710 | Update content depth and internal links for high-impression decliners. |
> | 3 | Refresh & Review Engagement | 7% | `low_engagement_visible_page` | 0.650 | Improve UX and structure for pages with sessions ≥30 but scroll rate < 30%. |
> | 4 | Expand & Refresh | <1% | `thin_visible_page` | 0.800 | Expand content depth on thin pages (<1,200 words) with high visibility. |
> | 5 | Monitor | 44% | `general_refresh_review` | N/A | Re-score monthly; no immediate edit needed. |

#### 4 Diagnostic Notes
1. **What changed in prompt:** Added **Verification Criteria** (client-holdout evaluation, Precision@50, ROC AUC, 4-component baseline comparison, 3.1× lift quantification).
2. **What actually improved in output:** The output now includes a complete, mathematically verified executive summary proving why ML beats hand-rules (0.740 vs 0.240 Precision@50) on unseen clients.
3. **What failed in output:** Nothing — output is complete, disciplined, and production-ready.
4. **What to try next:** Clean up into a final reusable prompt template for strangers on the track.

---

## 3. Final Reusable Production Prompt

Below is the cleaned-up, fully engineered prompt template that anyone on the Search Intelligence track can copy and use directly:

```text
Act as a Senior ML Engineer and Search Intelligence Specialist.

[GOAL]
Analyze the provided search performance dataset and generate a prioritized content refresh queue for editorial resource allocation.

[AUDIENCE]
Head of SEO or Product Lead at a growth-stage content platform who needs to allocate finite editing budget efficiently ($150–$500 per article refresh).

[CONTEXT & DATASET CONTRACT]
- Dataset Scope: 30,000 pseudonymized content pages across 32 clients aggregated over 90 days.
- Target Base Rate: 54.2% of pages are in active decline (>20% impression drop month-over-month).
- Available Features: impressions_90d, clicks_90d, sessions_90d, avg_position, ctr, content_age_days, days_since_last_update, word_count, engagement_rate, scroll_rate.

[CONSTRAINTS & SAFETY RULES]
- ZERO LEAKAGE: Do NOT use trend_pct or trend_direction as model features (these derive the target label).
- CAUSAL SAFETY: Do NOT make causal proof claims or state "this will recover traffic." Use "observed correlation" and "decision-support" language.
- NO BUZZWORDS: Eliminate fluff ("cutting-edge", "game-changing", "results-driven", "predicting Google").

[SPECIFIED OUTPUT FORMAT]
1. Executive Metric Summary: Model Precision@50, ROC AUC, and lift over hand-rule baseline on a client-holdout split.
2. 5-Tier Action Table:
   - Tier 1: Refresh & Review CTR (~22% volume)
   - Tier 2: Refresh (~27% volume)
   - Tier 3: Refresh & Review Engagement (~7% volume)
   - Tier 4: Expand & Refresh (<1% volume)
   - Tier 5: Monitor (~44% volume)
3. Include reason codes (e.g., declining_with_demand, low_ctr_visible_page) and operational editor actions for each tier.

[VERIFICATION CRITERIA]
- Validate model performance on a client-holdout split (~20% unseen clients).
- Report Precision@50 against the 0.240 hand-rule baseline and 0.542 base rate.
- Document top feature importances and explicit model limitations.
```

---

## 4. Evaluation Checklist (Pass / Revise)

| Criterion | Status | Verification |
|---|---|---|
| **Six runs total** | ✅ PASS | Baseline (V0) + 5 single-layer iterations (V1–V5). |
| **One layer per version** | ✅ PASS | V1: Audience, V2: Context, V3: Constraints, V4: Format, V5: Verification. |
| **Output-focused notes** | ✅ PASS | Notes describe how the *output* changed (e.g. "eliminated leaky feature", "added 5-tier markdown table"), not just the prompt. |
| **Honest failure moment** | ✅ PASS | Version 2 explicitly documents the **label leakage failure** where AI used `trend_pct` as a feature. |
| **Reusable final prompt** | ✅ PASS | Clean, standalone prompt template ready for any stranger on the track. |
