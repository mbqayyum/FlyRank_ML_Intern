# AI Fluency Week 1: Draw the Path (Sitemap & Toolkit Setup)

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Week 1)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** July 2026

---

## 1. Proof Statement & The "Why"

### Proof Statement
> I build machine learning models for search content refresh prioritization that identify decaying performance on real panel data with honest leakage control and clear limits. I am proving this to a Head of SEO or Product Lead at a growth-stage content platform, so they will review my deployed research paper and book a 15-minute technical discovery call.

### One-Line Why This Needs to Exist
> A standard CV or LinkedIn profile lists keywords like "Scikit-Learn" and "Data Mining," but cannot prove I know how to prevent label leakage on dynamic panel data or deliver operational decision-support queues that achieve a 3.1× precision lift over transparent hand-rules.

---

## 2. Portfolio Sitemap Sketch

The sitemap is deliberately kept lean (3 core pages) to guide the target visitor from landing, to believing, to taking the single primary action in under 30 seconds.

```
                         ┌──────────────────────────────────┐
                         │      1. HERO / LANDING PAGE      │
                         │               (/)                │
                         │                                  │
                         │ • Proof Statement & Headline     │
                         │ • 3.1x Precision Lift Callout    │
                         │ • Research Paper Teaser          │
                         │ • CTA: "Read Paper & Book Call"  │
                         └─────────────────┬────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
  ┌──────────────────────────────────┐          ┌──────────────────────────────────┐
  │     2. CAPSTONE RESEARCH PAPER   │          │  3. CONTACT / BOOKING DISCOVERY  │
  │            (/paper)              │          │             (/contact)           │
  │                                  │─────────►│                                  │
  │ • Abstract & Problem Framing     │  Direct  │ • 15-Minute Discovery Calendar   │
  │ • Data Safety & Split Logic      │   CTA    │ • Technical Inquiry Form         │
  │ • Model Results vs Hand-Rules    │          │ • GitHub & Code Links            │
  │ • Embedded Interactive Queue     │          │ • Direct Contact (m.b.qayyum)    │
  │ • Honest Limitations             │          │                                  │
  └──────────────────────────────────┘          └──────────────────────────────────┘
```

> **Visual Artifact:** The visual SVG sitemap sketch is available at [`work/ai_fluency_week01/sitemap_sketch.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week01/sitemap_sketch.svg).

### Page Breakdown & Justification
1. **Hero / Landing Page (`/`)**: Establishes immediate credibility. Presents the core claim, key metrics (3.1× lift, Precision@50 0.740), a preview of the capstone paper, and a prominent primary CTA button.
2. **Capstone Research Paper (`/paper`)**: The proof engine. Walks the reader through methodology, leakage checks, client-holdout validation, model comparisons, embedded interactive queue, and explicit limitations.
3. **Contact / Booking (`/contact`)**: The conversion destination. Allows the Head of SEO or Product Lead to schedule a 15-minute technical discovery call or inspect the underlying GitHub repository.

---

## 3. Toolkit Setup

The free AI toolkit has been established across four providers:

| Provider | Tool Role | Account Status | Workspace Name |
|---|---|---|---|
| **Anthropic Claude** | Primary Build Partner & Tutor | Active (Free Tier) | Project: `FlyRank-Search-ML-Portfolio` |
| **OpenAI ChatGPT** | Comparative Auditor & Code Refiner | Active (Free Tier) | Custom GPT Context Configured |
| **Google Gemini** | Data & Documentation Assistant | Active (Free Tier) | Gem: `Search-ML-Tutor` |
| **Perplexity AI** | Research & Literature Search | Active (Free Tier) | Default Workspace |

---

## 4. Claude Project Configuration

- **Project Name:** `FlyRank-Search-ML-Portfolio`
- **Tutor Persona & Custom Instructions:**

```text
You are an expert AI & ML Technical Tutor assisting M. B. Qayyum with building a search intelligence portfolio.

CORE CONTEXT & PROOF STATEMENT:
"I build machine learning models for search content refresh prioritization that identify decaying performance on real panel data with honest leakage control and clear limits. I am proving this to a Head of SEO or Product Lead at a growth-stage content platform, so they will review my deployed research paper and book a 15-minute technical discovery call."

YOUR ROLE & RULES:
1. Act as a sharp, demanding AI tutor. Always explain your reasoning concisely.
2. Pressure-test all code, sitemaps, and write-ups against the one proof statement, the one target person (Head of SEO), and the one action (booking a 15-min call).
3. Enforce public data safety: never allow client names, domains, URLs, or raw credentials.
4. Enforce honest claim language: insist on "observed", "measured", "directional", and "decision-support" language — never allow "causal proof" or "predicting Google".
5. Keep explanations grounded, code clean, and context focused.
```

---

## 5. Pressure-Test Prompt & Output

### Prompt Executed
```text
This is my proof statement:
"I build machine learning models for search content refresh prioritization that identify decaying performance on real panel data with honest leakage control and clear limits. I am proving this to a Head of SEO or Product Lead at a growth-stage content platform, so they will review my deployed research paper and book a 15-minute technical discovery call."

This is my draft sitemap:
1. Hero / Landing Page (/): Proof Statement + 3.1x Lift Headline + CTA
2. Capstone Research Paper (/paper): Abstract, Data Safety, Methodology, Model Comparison, Limitations
3. Interactive Queue Explorer (/demo): Standalone filterable page showing the 30k-row queue with reason codes
4. Contact / Book Call (/contact): 15-minute discovery scheduler

Does this sitemap walk my one person from landing, to believing me, to taking my one action, and does it actually prove my claim? Tell me which pages earn their place, which are wasted, and what is missing. Be specific, not encouraging.
```

### AI Pressure-Test Response
> **Critique from Claude Tutor:**
> 
> 1. **Page 1 (Hero/Landing) — Earns its place.** It quickly sets the claim and headline metric. However, ensure the hero CTA links directly to Page 2 or Page 4 without forcing a long navigation path.
> 
> 2. **Page 2 (Capstone Research Paper) — Earns its place.** This is your primary proof engine. It contains the data contract, client-holdout split, ROC AUC, Precision@50, and limitations.
> 
> 3. **Page 3 (Interactive Queue Explorer) — WASTED AS A SEPARATE PAGE.** A busy Head of SEO will not click through 4 separate pages. Placing the Queue Explorer on a separate `/demo` page adds navigation friction and increases drop-off before they reach the booking form.
> 
> 4. **Page 4 (Contact / Book Call) — Earns its place.** Essential for completing the one action.
> 
> **Recommendation:** Consolidate Page 3 directly into Page 2. Embed the interactive queue preview inside the Results / Playbook section of the Capstone Research Paper. Reduce your sitemap from 4 pages to 3 pages.

---

## 6. What Was Changed Based on Feedback

- **Observation / Feedback:** Having a separate `Interactive Queue Explorer` page (`/demo`) split the proof flow and created unnecessary drop-off friction before the visitor reached the booking action.
- **Change Made:** **Consolidated the sitemap from 4 pages down to 3 core pages.** The interactive refresh queue viewer and reason-code explorer are now embedded directly within the Capstone Research Paper (`/paper`), creating a seamless narrative flow from problem → method → results → interactive proof → contact.

---

## 7. Deliverable Verification

- [x] Proof statement names **one claim**, **one person**, and **one action**.
- [x] Includes one-line statement on why this portfolio must exist beyond a CV/LinkedIn.
- [x] Minimalist 3-page sitemap created and visually documented (`sitemap_sketch.svg`).
- [x] Free toolkit setup verified across Claude, ChatGPT, Gemini, and Perplexity.
- [x] Claude Project configured with custom tutor instructions and proof statement.
- [x] Sitemap pressure-tested with AI and at least one concrete change documented.
