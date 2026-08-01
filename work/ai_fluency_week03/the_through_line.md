# AI Fluency Week 3: The Through-Line (Content Map & Architecture)

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Week 3)
- **Assignment URL:** [https://aifluency.flyrank.ai/week-03.html#the-through-line](https://aifluency.flyrank.ai/week-03.html#the-through-line)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** August 2026

---

## 1. The One-Line Claim

### Brainstorming & Selection Log (10 Options Evaluated)

1. *I build AI models for search engines that predict traffic.* (Too generic; sounds like marketing fluff).
2. *I help companies fix old articles using machine learning and Python.* (Weak, informal tone).
3. *I build content refresh algorithms that achieve 3.1x precision on 30k pages.* (Better, but misses leakage control).
4. *I train leakage-free models that rank declining articles for SEO teams.* (Technical, but lacks impact numbers).
5. *I prioritize content rewrites using Scikit-Learn and BigQuery datasets.* (Tool list trap — names technologies, not proof).
6. **SELECTED & SHARPHENED:**
   > **"I build machine learning models for search content refresh prioritization that achieve a 3.1× precision lift over hand-rules on real 30k-row panel data with honest leakage control."**
7. *I prove how Random Forest models beat traditional SEO hand-rules on panel data.* (Focuses on algorithm rather than domain utility).
8. *I deliver decision-support queues that save editorial budget on declining search pages.* (Lacks concrete precision metric).
9. *I build search intelligence models that identify declining content with zero label leakage.* (Good, but option 6 is sharper).
10. *I stop wasted article rewrites by scoring traffic decay on 32 client panels.* (Action-focused, but lacks benchmark lift).

### Why Option 6 Wins
It states the **single primary claim** in one memorable sentence: it names the specific ML domain (*search content refresh prioritization*), quantifies the empirical proof (*3.1× precision lift over hand-rules*), specifies the real dataset scale (*30k-row panel data*), and highlights the core engineering boundary (*honest leakage control*).

---

## 2. The Content Map (Pages → Ordered Sections → Lead Case → CTA)

The sitemap is structured around a lean, 3-page conversion funnel designed to guide a Head of SEO or Product Lead from landing, to believing, to booking a 15-minute discovery call in under 30 seconds.

```
                          ┌──────────────────────────────────────────────┐
                          │         1. HERO / LANDING PAGE (/)           │
                          │                                              │
                          │ • Hero Headline & One-Line Claim             │
                          │ • 3.1x Precision Lift Metric Card            │
                          │ • Problem & Label Leakage Trap               │
                          │ • Lead Case Study Teaser (Random Forest)     │
                          │ • CTA: "Read Research Paper" ───────────────┐│
                          └─────────────────────────────────────────────┼┘
                                                                        │
                    ┌───────────────────────────────────────────────────┘
                    ▼
  ┌──────────────────────────────────────────────┐          ┌──────────────────────────────────────────────┐
  │      2. CAPSTONE RESEARCH PAPER (/paper)     │          │    3. CONTACT & DISCOVERY CALL (/contact)    │
  │                                              │          │                                              │
  │ • Abstract & Data Contract                   │          │ • 15-Minute Discovery Calendar Embed         │
  │ • Client-Holdout Split & Baseline Comparison │─────────►│ • Technical Inquiry Form                     │
  │ • 5-Tier Ranked Queue Explorer (Embedded)    │  Direct  │ • GitHub Repository & Code Verification      │
  │ • Honest Limitations & Decision Boundaries   │   CTA    │ • Direct Contact (m.b.qayyum@flyrank.ai)     │
  │ • CTA: "Book 15-Minute Discovery Call" ──────┼──────────┘                                              │
  └──────────────────────────────────────────────┘                                                         │
```

---

### Page 1: Hero / Landing Page (`/`)

- **Primary Goal:** Establish immediate technical credibility and drive visitors directly to the research paper.
- **Lead Work Featured:** 3.1× Precision Lift Benchmark (Random Forest vs 4-Component Hand-Rule Baseline).

| Section Order | Section Name | Content & Case Study Placement | Section Call to Action (CTA) |
|---|---|---|---|
| **1.1** | **Hero Banner** | One-Line Claim, 3.1× Precision Lift Badge, and primary proof teaser. | Primary Button: `"Read Capstone Research Paper"` (`/paper`) |
| **1.2** | **The Core Problem** | The $150–$500 editorial budget waste problem on decaying content and target label leakage risks. | Anchor Link: `"See How We Stop Label Leakage"` |
| **1.3** | **Lead Case Teaser** | Comparative evaluation card: Random Forest (**Precision@50 = 0.740**) vs Hand-Rules (**0.240**). | Secondary Button: `"Inspect Model Methodology"` (`/paper#methodology`) |
| **1.4** | **Queue Preview** | Sample 5-tier queue breakdown with reason codes (`low_ctr_visible_page`, `declining_with_demand`). | Text Link: `"Explore Full Interactive Queue"` (`/paper#queue`) |
| **1.5** | **Conversion Footer** | Summary pitch targeting Head of SEO / Product Lead. | Footer CTA: `"Review Full Research Paper & Benchmark"` (`/paper`) |

---

### Page 2: Capstone Research Paper (`/paper`)

- **Primary Goal:** Serve as the definitive proof engine — walking the reader through data contracts, leakage control, model benchmarks, and honest limitations.
- **Lead Work Featured:** Full Model Report, Client-Holdout Split Metrics, and 30,000-Row Queue Explorer.

| Section Order | Section Name | Content & Case Study Placement | Section Call to Action (CTA) |
|---|---|---|---|
| **2.1** | **Paper Abstract** | Formal executive abstract, dataset scale (30k rows, 32 clients), and base-rate context (54.2% decline). | Anchor Link: `"Jump to Verification Benchmark"` |
| **2.2** | **Data Contract & Safety** | Plain-words data contract, excluded target features (`trend_pct`), and client holdout split logic. | Button: `"View Source Data Contract Code"` (GitHub link) |
| **2.3** | **Model Architecture** | Model comparison table (Logistic Regression, Decision Tree, Random Forest) evaluated on held-out clients. | Card Callout: `"3.1x Lift Confirmed"` |
| **2.4** | **Interactive Queue** | Embedded filterable table showing 5 action tiers, volume %, reason codes, and editor instructions. | Tool Button: `"Download Sample Queue CSV"` |
| **2.5** | **Honest Limitations** | Explicit non-causal decision-support disclaimer and client tracking heterogeneity audit. | Section CTA: `"Verify Code on GitHub"` |
| **2.6** | **Primary Conversion** | High-contrast conversion section linking paper results directly to technical booking. | Primary Button: `"Book 15-Minute Discovery Call"` (`/contact`) |

---

### Page 3: Contact & Booking (`/contact`)

- **Primary Goal:** Convert believing visitors (Heads of SEO / Product Leads) into booked 15-minute technical discovery calls.
- **Lead Work Featured:** Direct Booking Scheduler & Open Source Code Verification.

| Section Order | Section Name | Content & Case Study Placement | Section Call to Action (CTA) |
|---|---|---|---|
| **3.1** | **Contact Header** | Direct pitch: *"Discuss search content refresh prioritization for your platform data."* | Subhead: `"15-Minute Technical Discovery Call"` |
| **3.2** | **Calendar Scheduler** | Embedded Cal.com / Calendly calendar widget for instant 15-minute booking slots. | Embedded Widget: `"Select Date & Time"` |
| **3.3** | **Technical Form** | Minimal inquiry form for visitors with custom dataset evaluation questions. | Form Button: `"Send Technical Query"` |
| **3.4** | **Code & Repo Links** | Direct links to public GitHub repository, executed Jupyter notebooks, and test suites. | External Link: `"Inspect mbqayyum/FlyRank_ML_Intern Repo"` |

---

## 3. The "Still Need to Gather" Checklist

Below is the honest inventory of proof assets and technical components required before the portfolio build week:

| Asset / Proof Item | Status | Action Required & Owner | Target Completion Date |
|---|---|---|---|
| **30k Panel Dataset Contract** | ✅ COMPLETE | Verified in `work/notebooks/w03_data_contract.ipynb` | August 1, 2026 |
| **Model Verification Metrics** | ✅ COMPLETE | Random Forest trained (0.740 Precision@50, 3.08x lift) | August 1, 2026 |
| **PDF Research Paper** | ✅ COMPLETE | Compiled 2-page report (`outputs/reports/flyrank_research_paper.pdf`) | August 1, 2026 |
| **Brand Identity SVG Kit** | ✅ COMPLETE | Logo, favicon, and hero background texture generated in `work/ai_fluency_week03/` | August 1, 2026 |
| **Deployed Web Hosting URL** | ⏳ NEED TO GATHER | Deploy static site to Vercel / GitHub Pages (`flyrank.ai` subdomain) | Build Week (W04) |
| **Interactive Queue JS Widget** | ⏳ NEED TO GATHER | Implement vanilla JS filterable table for `refresh_queue_sample.csv` on `/paper` | Build Week (W04) |
| **Calendar Scheduler Embed** | ⏳ NEED TO GATHER | Create & embed Cal.com / Calendly 15-min discovery link on `/contact` | Build Week (W04) |
| **Real Author Portrait Photo** | ⏳ NEED TO GATHER | Finalize high-resolution headshot file (`mbqayyum_headshot.jpg`) | Build Week (W04) |

---

## 4. Pass / Revise Audit Checklist

| Criterion | Status | Verification Evidence |
|---|---|---|
| **Single, memorable claim** | ✅ PASS | One-line claim established: *"I build machine learning models for search content refresh prioritization that achieve a 3.1× precision lift over hand-rules on real 30k-row panel data with honest leakage control."* |
| **Ordered sections & CTAs per page** | ✅ PASS | All 3 pages (`/`, `/paper`, `/contact`) feature ordered sections, lead case studies, and clear CTAs. |
| **CTAs ladder up to Chapter 1 action** | ✅ PASS | Every CTA funnels visitors from hero $\rightarrow$ research paper $\rightarrow$ booking a 15-minute discovery call. |
| **Honest gather-list provided** | ✅ PASS | Complete inventory of completed vs remaining assets (deployment URL, JS filter widget, calendar embed). |
