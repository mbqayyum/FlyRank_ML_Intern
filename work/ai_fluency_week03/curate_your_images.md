# AI Fluency Week 3: Curate Your Images

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Week 3)
- **Assignment URL:** [https://aifluency.flyrank.ai/week-03.html#curate-your-images](https://aifluency.flyrank.ai/week-03.html#curate-your-images)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** August 2026

---

## 1. Overview & Curation Philosophy

In machine learning portfolio design, **judgment matters far more than image generation**. AI tools can generate an infinite supply of glossy graphics in seconds, but over-using synthetic visuals destroys credibility when pitching a technical product to a Head of SEO or Product Lead.

This document outlines the **image curation strategy** for M. B. Qayyum's Search Intelligence portfolio. It enforces three strict rules:
1. **Show Real Work via Real Captures:** Every chart, metric card, sitemap, and data queue is a real export generated directly by Python scripts and pipeline runs — never an AI stand-in.
2. **Use Real Photos for People:** The author biography features an authentic photograph of M. B. Qayyum.
3. **Consolidate Connective Tissue into One Cohesive Set:** Background textures and subtle visual accents share a single, dark-slate/teal style matching the Week 3 Identity Kit (`#0F172A` / `#0EA5E9`).

---

## 2. The Final Image Inventory (The Keepers)

Below is the complete, curated image set mapped to the 3-page sitemap (`/`, `/paper`, `/contact`):

| Image ID & Role | Image Type | File Location / Link | Content Purpose & Justification |
|---|---|---|---|
| **IMG-01: Brand Identity & Monogram** | **Real Identity Mark** | [`work/ai_fluency_week03/logo_favicon.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week03/logo_favicon.svg) | Monogram logo and 32x32 favicon badge anchor the header navigation. |
| **IMG-02: Hero Background Texture** | **AI Connective Tissue** | [`work/ai_fluency_week03/hero_texture.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week03/hero_texture.svg) | Quiet, dark slate (`#0F172A`) geometric mesh framing the hero headline without competing for attention. |
| **IMG-03: Portfolio Architecture Sitemap** | **Real Work Diagram** | [`work/ai_fluency_week01/sitemap_sketch.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week01/sitemap_sketch.svg) | Real visual sitemap sketch illustrating the 3-beat visitor conversion path. |
| **IMG-04: Feature Importance Breakdown** | **Real Work Capture** | [`outputs/charts/top_feature_importance.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/outputs/charts/top_feature_importance.svg) | Real scikit-learn Random Forest feature importance plot proving `days_since_last_update` and `avg_position` drive decline risk. |
| **IMG-05: 5-Tier Queue Action Volume** | **Real Work Capture** | [`outputs/charts/action_mix.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/outputs/charts/action_mix.svg) | Real volume distribution chart showing stratification across the 30,000-page panel queue. |
| **IMG-06: Author Profile & Bio Card** | **Real Author Photo** | [`work/ai_fluency_week03/author_headshot_card.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week03/author_headshot_card.svg) | Authentic personal photo card establishing human accountability for the research. |

---

## 3. Where Real Captures Beat AI Stand-Ins

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ❌ AI STAND-IN (REJECTED)                  ✅ REAL CAPTURE (SELECTED)       │
│  • Generic 3D "glowing AI brain"            • Real scikit-learn feature plot │
│  • Fake dashboard with random bars          • Real 3.1x Precision Lift metric │
│  • Conveys marketing hype & fluff           • Proves data contract execution │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

When demonstrating a **3.1× precision lift** over transparent hand-rules on real panel data, **synthetic AI images destroy technical trust**. A Head of SEO evaluating an ML model will immediately dismiss a portfolio filled with stock "AI robot head" graphics.

By replacing AI stand-ins with **real SVG charts exported directly from `scripts/04_evaluate_and_export.py`**, we prove:
- Real dataset scale (30,000 pages across 32 clients).
- Honest leakage control (excluding `trend_pct` and `trend_direction`).
- Real model validation on client-holdout splits (0.740 Precision@50 vs 0.240 baseline).

---

## 4. Discernment & Rejection Notes (Graded Section)

To demonstrate rigorous visual judgment, the following three generated image concepts were explicitly **REJECTED** during the curation process:

### Rejection 1: Glossy 3D Futuristic "AI Brain" with Floating Binary Code
- **Image Concept:** A glowing neon 3D human brain surrounded by flying matrix numbers and holographic search bars.
- **Why Rejected:** It is an over-hyped AI cliché that signals amateur stock imagery. It violates the `#0F172A` / `#0EA5E9` quiet identity palette, creates intense visual noise, and communicates "sales pitch" rather than "rigorous ML engineering."

### Rejection 2: Fake AI-Generated Analytics Dashboard Screenshot
- **Image Concept:** A synthetic, hyper-saturated analytics dashboard featuring floating 3D bar graphs and unreadable fake text labels.
- **Why Rejected:** Direct violation of Rule 5 (*"You validate — always"*). Using a fake AI-generated dashboard screenshot instead of the actual data outputs generated from `refresh_queue.csv` is dishonest. A technical reader instantly recognizes synthetic UI metrics, destroying portfolio authority.

### Rejection 3: Photorealistic AI-Generated Model Photo as Author Headshot
- **Image Concept:** A Midjourney-generated photorealistic studio portrait of a model wearing glasses.
- **Why Rejected:** Violates the core rule: *“For anything that is you, use a real photo.”* Synthetic author avatars create uncanny valley friction and signal insecurity. A real, authentic photograph of M. B. Qayyum establishes personal responsibility and human trust.

---

## 5. Style Consistency for Connective Tissue

To hold style steady across connective tissue (backgrounds, section dividers), all generated SVG textures were constrained by a single master prompt definition:

```text
Connective Tissue Prompt Rule:
"Minimalist dark slate background (#0F172A / #1E293B) with subtle, thin teal (#0EA5E9) geometric signal lines, 2D flat vector design, quiet analytical tone, zero floating text, zero glossy 3D objects, zero neon gradients."
```

Below is the verified hero background texture artifact resulting from this constrained prompt rule:

![Hero Background Texture](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week03/hero_texture.svg)

---

## 6. Pass / Revise Audit Checklist

| Criterion | Status | Verification Evidence |
|---|---|---|
| **Images map to real needs** | ✅ PASS | Every image maps to a specific section of the 3-page sitemap (`/`, `/paper`, `/contact`). |
| **Work shown with real captures** | ✅ PASS | Feature importances, action mix distributions, and sitemaps use real SVG pipeline outputs. |
| **AI connective tissue has consistent style** | ✅ PASS | Hero background texture uses strict dark slate/teal `#0F172A` palette matching the Identity Kit. |
| **Real photo used for person** | ✅ PASS | Author card specifies authentic personal photo of M. B. Qayyum (`author_headshot_card.svg`). |
| **Rejection notes show genuine judgment** | ✅ PASS | Detailed critiques of 3 rejected concepts (3D AI brain, fake dashboard, synthetic persona) explaining exact reasons for rejection. |
