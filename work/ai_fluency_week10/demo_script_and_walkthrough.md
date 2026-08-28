# FlyRank Capstone — 3–5 Minute Showcase Demo Script & Walkthrough (FL-09)

**Presenter:** M. B. Qayyum · Machine Learning & AI Fluency Track  
**Target Duration:** 3–5 Minutes (Actual: 3m 53s)  
**Format:** Live Terminal & Live Web Page Walkthrough (No Static Slides)  
**YouTube Video (Unlisted):** [https://youtu.be/PCrmfC9vPJ4](https://youtu.be/PCrmfC9vPJ4)  
**Video File (1080p MP4):** [`work/outputs/flyrank_refresh_scout_demo.mp4`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/outputs/flyrank_refresh_scout_demo.mp4)  
**Watch on GitHub:** [https://github.com/mbqayyum/FlyRank_ML_Intern/blob/main/work/outputs/flyrank_refresh_scout_demo.mp4](https://github.com/mbqayyum/FlyRank_ML_Intern/blob/main/work/outputs/flyrank_refresh_scout_demo.mp4)  
**Live Platform:** [https://mbqayyum.github.io/FlyRank_ML_Intern/#demo](https://mbqayyum.github.io/FlyRank_ML_Intern/#demo)  

---

## 1. Demo Narrative Beats & Timestamps

### **Beat 1: The Problem & The Incumbent Rule Failure (0:00 – 1:00)**
- **Screen:** Open [`docs/index.html`](https://mbqayyum.github.io/FlyRank_ML_Intern/) on browser hero section.
- **Spoken Narration:**
  > *"Hi everyone, I'm M. B. Qayyum, Machine Learning Intern at FlyRank. Today I'm demonstrating our content refresh prioritization system.*
  > *In enterprise search portfolios, over 54% of indexed content is actively decaying in organic visibility. Content teams typically use simple heuristics—like flagging articles older than 180 days with rank > 15.*
  > *When we evaluated these heuristic rules on 30,000 anonymized pages across 32 clients, they achieved only a 0.240 Precision@50. That means 76% of flagged articles are false alarms, wasting editorial budgets."*

---

### **Beat 2: The Live Pipeline Run & Architecture (1:00 – 2:15)**
- **Screen:** Switch to Terminal and run `python scripts/run_all.py`.
- **Spoken Narration:**
  > *"Let's run our end-to-end pipeline live in the terminal. In under 10 seconds, `run_all.py` cleans the 30,000-page dataset, executes our strict client-holdout split—holding out 6 entire enterprise clients—and trains a balanced Random Forest ensemble.*
  > *Notice that we strictly exclude `trend_direction` and client IDs to prevent label leakage. The output generates an explainable 5-tier ranked queue in `work/outputs/`."*

---

### **Beat 3: The Headline Results & Feature Hierarchy (2:15 – 3:15)**
- **Screen:** Return to browser, scroll to **Results Section & Figures** in the deployed research paper.
- **Spoken Narration:**
  > *"Looking at our evaluation table, the Random Forest model achieves an ROC-AUC of 0.750 and a Precision@50 of 0.740—delivering a 3.1× precision lift over transparent baseline rules.*
  > *Examining Figure 1 and our feature importances, the strongest predictor of decline isn't raw page age—it is `days_with_impressions`, our impression consistency metric. Pages with sporadic visibility have already bottomed out; pages with consistent visibility are the ones actively at risk of losing prime rankings."*

---

### **Beat 4: One Design Decision & One Honest Limitation (3:15 – 4:15)**
- **Screen:** Scroll to **Limitations & Honest Framing Box** in the deployed research paper.
- **Spoken Narration:**
  > *"Now I want to address one critical design decision and one real limitation.*
  > *The design decision: We refused to use random k-fold cross-validation because it allows models to cheat on shared domain authority. Holding out entire client organizations was harder, but it gives an honest estimate of real-world generalization.*
  > *The limitation: Our model is purely observational. A high score means a page exhibits patterns associated with past decay; it does NOT prove that rewriting the article will guarantee rank recovery. Because of this, we enforce strict non-automation guardrails—the model is a triage assistant, never an autonomous publisher."*

---

### **Beat 5: The 5-Tier Action Playbook & Wrap-up (4:15 – 5:00)**
- **Screen:** Scroll to **Ranked Action Playbook Section** and footer Graduate Badge.
- **Spoken Narration:**
  > *"Finally, we translate model scores into five concrete action tiers—separating $10–$25 CTR metadata quick-wins from $150–$500 structural rewrites.*
  > *The entire research paper, open-source notebooks, and interactive playbook are live at `https://mbqayyum.github.io/FlyRank_ML_Intern/`.*
  > *Thank you for watching!"*

---

## 2. Evaluation Criteria Self-Check (FL-09)
- [x] Live run demonstrated in terminal, zero slides.
- [x] Clear narration within 3–5 minute boundary.
- [x] One major design decision (Client-Holdout Partition) explained.
- [x] One honest limitation (Observational correlation vs. causal recovery) explained on camera.
- [x] Transparency diligence: AI assistance acknowledged with human verification checks.
