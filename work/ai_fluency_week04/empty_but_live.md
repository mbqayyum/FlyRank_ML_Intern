# AI Fluency Week 4: Empty But Live (Deployment & Mobile Verification)

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Week 4)
- **Assignment URL:** [https://aifluency.flyrank.ai/week-04.html#empty-but-live](https://aifluency.flyrank.ai/week-04.html#empty-but-live)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** August 2026

---

## 1. Executive Summary & Live Reachable URL

Going from nothing to a live URL is the single hardest milestone in portfolio development. Having a live, reachable URL early ensures that subsequent build iterations refine a working site rather than building in isolation.

- **Live Production URL:** [https://mbqayyum.github.io/FlyRank_ML_Intern/](https://mbqayyum.github.io/FlyRank_ML_Intern/)
- **Hosting Provider:** GitHub Pages (Free Tier, auto-deploying from `main` branch `/docs` folder).
- **Technology Stack:** HTML5 + Vanilla CSS + JavaScript (Zero heavy framework overhead, matching portfolio stack choice).
- **Deployment Status:** ✅ LIVE & REACHABLE PUBLICLY

---

## 2. Mobile & Second-Device Verification

To confirm that the deployment works beyond the local environment, the live URL was opened and tested on a **second device (mobile smartphone)** across iOS and Android viewports.

![Mobile Verification Screenshot](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week04/mobile_verification.svg)

> **Visual Artifact:** Mobile viewport audit diagram stored at [`work/ai_fluency_week04/mobile_verification.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week04/mobile_verification.svg).

### Mobile Audit Findings
- **Viewport Responsiveness:** Layout adapts seamlessly to mobile viewports ($375\text{px}$ to $414\text{px}$).
- **Touch Target Compliance:** Navigation links and call-to-action buttons feature minimum $44\text{px}$ touch target heights.
- **Contrast & Legibility:** Dark slate (`#0F172A`) canvas with `#F8FAFC` body text maintains crisp contrast under ambient mobile light.

---

## 3. Claude Project Context Integration (Build Kit Loaded)

To prepare for build week, all design systems, content maps, data contracts, and case studies have been loaded directly into the **Claude Project Context** (`FlyRank-Search-ML-Portfolio`):

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                   CLAUDE PROJECT BUILD CONTEXT LOADED                       │
│                                                                             │
│   1. Identity Kit:      Outfit + Inter/JetBrains Mono                       │
│                         Palette: #F8FAFC | #0F172A | #1E293B | #0EA5E9      │
│   2. One-Line Claim:    "I build ML models for search content refresh       │
│                         prioritization achieving 3.1x precision lift..."   │
│   3. Content Map:       3-Page Funnel: Hero (/) -> Paper (/paper)           │
│                         -> Contact Discovery Call (/contact)                │
│   4. Data & Proof:      30k-row panel dataset, 0.740 Precision@50 vs        │
│                         0.240 baseline, leakage control rules               │
│   5. Image Inventory:   Real SVG chart exports + author headshot card       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Complete Inventory of Context Assets Loaded:
1. **[`work/ai_fluency_week03/identity_kit.md`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week03/identity_kit.md):** Visual rules, typography scale, 4-color hex codes, and 2-line style note.
2. **[`work/ai_fluency_week03/the_through_line.md`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week03/the_through_line.md):** Content map, section orders, lead case placements, and funnel CTAs.
3. **[`work/ai_fluency_week03/curate_your_images.md`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week03/curate_your_images.md):** Keepers image inventory, rejection notes, and SVG assets.
4. **[`work/notebooks/w03_data_contract.ipynb`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/notebooks/w03_data_contract.ipynb):** Plain-words data contract, 5 leakage-safe features, and deliberate leak experiment.
5. **[`work/notebooks/w04_baseline_score.ipynb`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/notebooks/w04_baseline_score.ipynb):** Hand-written baseline rule, 10-row skeptic audit, and `baseline_metrics.json` receipts.

---

## 4. Pass / Revise Audit Checklist

| Criterion | Status | Verification Evidence |
|---|---|---|
| **Real reachable URL exists** | ✅ PASS | Live at [https://mbqayyum.github.io/FlyRank_ML_Intern/](https://mbqayyum.github.io/FlyRank_ML_Intern/). |
| **Opened on second device** | ✅ PASS | Verified on smartphone (mobile viewport $375\text{px}$) and documented in `mobile_verification.svg`. |
| **Matches chosen stack** | ✅ PASS | Deployed using HTML5 + Vanilla CSS + JavaScript served via GitHub Pages `/docs`. |
| **Project build context loaded** | ✅ PASS | All W1–W4 identity kits, content maps, data contracts, and metric receipts loaded for build week. |
