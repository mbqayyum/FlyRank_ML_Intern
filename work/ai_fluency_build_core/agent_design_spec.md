# Personal AI Agent Design Spec — FlyRank Refresh Scout & Queue Manager

- **Author:** M. B. Qayyum  
- **Track:** AI Fluency Track (Phase: Build Core — Capstone Agent Spec)  
- **Repo:** [`mbqayyum/FlyRank_ML_Intern`](https://github.com/mbqayyum/FlyRank_ML_Intern)  
- **Date:** August 2026  
- **Estimated Build Time:** ~10 Hours  
- **Build Platform:** n8n Agent Workflow Engine + Scripted Python Tools & Claude API  

---

## 1. Job to be Done (JTBD) & Persona

### Core Problem Statement
Content managers at FlyRank handle enterprise search portfolios exceeding 10,000+ articles across 32+ client sites. Every month, over 50% of articles experience natural traffic decay. Editing resources are constrained: refreshing an article costs $150–$500 in editorial time. Manual auditing leads to two major failures:
1. **Wasted Spend (False Positives):** Rewriting high-volume evergreen articles that are old but performing stably.
2. **Missed Opportunity (False Negatives):** Overlooking high-value Page 1 articles quietly losing impressions due to CTR collapse or SERP layout shifts.

### The Agent's Single Job
The **FlyRank Refresh Scout** is an autonomous content triage agent. It periodically scans performance data, queries GSC and GA4 analytics, applies a trained Random Forest model to predict decay probability, attaches operational reason codes (`low_ctr_visible_page`, `freshness_risk`, `depth_gap`), verifies live SERP layout features, ranks the top 50 refresh candidates, and drafts structured editorial review briefs in Notion/GitHub Issues for human approval.

### Primary User & Usage Cadence
- **Primary User:** M. B. Qayyum (SEO ML Engineer & Content Strategist).
- **Usage Frequency:** Automated daily background scan + interactive weekly queue review.

---

## 2. Tools, Data Sources & Realistic Access Plan

| Tool Name | Purpose & Functionality | Data Source / API | Access Plan & Auth Security |
| :--- | :--- | :--- | :--- |
| **`query_content_performance_db`** | Fetches 90-day search metrics, CTR, average position, staleness, and traffic trends for client pages. | Hugging Face Warehouse (`hf://datasets/FlyRank/internship-warehouse`) or local DuckDB cache (`data/raw/content_refresh_anonymized.csv`). | Read-only SQL via DuckDB Python connector. Zero write access. API key stored in `.env` environment variables. |
| **`compute_refresh_score`** | Evaluates candidate pages through the trained Random Forest classifier (`work/outputs/rf_model.pkl`) to output decay probability scores. | Local Python ML artifact (`scikit-learn` model). | Executed locally via Python sub-process. Zero external API calls or network latency. |
| **`fetch_serp_context`** | Verifies live search engine result pages (SERPs) for target keywords to detect above-the-fold AI Overviews or ad blocks. | DuckDuckGo Search API / SERP API (Free Tier, 1,000 queries/mo). | REST API call authenticated via bearer token. Read-only query lookup. |
| **`create_draft_refresh_ticket`** | Generates structured editorial refresh briefs in Notion or GitHub Issues with reason codes and suggested actions. | Notion API / GitHub Issues REST API. | Scoped API token with `write:issues` permission. Writes exclusively to `Draft Review` stage. Never auto-publishes to live CMS. |

---

## 3. System Instructions (Model-Tools-Instructions Triad)

```markdown
SYSTEM INSTRUCTION: FlyRank Refresh Scout Agent

You are FlyRank Refresh Scout, an expert AI content triage agent. Your job is to identify, prioritize, and draft refresh briefs for declining search content.

### OPERATIONAL PIPELINE
1. QUERY & FILTER: Execute `query_content_performance_db` for active content pages. Filter out immature content (`content_age_days` < 90) and pages with zero impressions.
2. SCORE: Pass filtered feature vectors to `compute_refresh_score`. Retrieve model probability scores (`rf_prob`) and rank candidates descending.
3. REASON CODE ASSIGNMENT:
   - If avg_position <= 10 and ctr < 0.5%: Assign "low_ctr_visible_page" (Action: "Refresh & Review CTR").
   - If impressions_90d >= 5000 and days_since_last_update >= 90: Assign "declining_with_demand" (Action: "Refresh Content Depth").
   - If days_since_last_update >= 180: Assign "freshness_risk" (Action: "Refresh Content").
   - Otherwise: Assign "general_refresh_review" (Action: "Monitor").
4. VERIFY SERP: For top 10 ranked items, call `fetch_serp_context` to verify if AI Overviews or sponsored ads occupy above-the-fold space.
5. DRAFT BRIEF: Generate a structured markdown brief for top priority items and invoke `create_draft_refresh_ticket` with status "Draft Review".

### STRICT BOUNDARIES & HONESTY
- NEVER use trend_direction or trend_pct as input features (label leakage trap).
- NEVER make causal claims (e.g. "Refreshing will boost rank by 5 positions"). Use observational words ("associated with", "measured", "directional").
- NEVER execute direct write/update commands to client CMS platforms.
- ALWAYS append a "What Would Make It Wrong" skeptic note to every top-ranked recommendation.
```

---

## 4. Five Pre-Build Evaluation Cases (Evals)

To validate agent behavior before deployment, we define 5 deterministic test cases:

```carousel
![Eval Suite Overview](https://raw.githubusercontent.com/mbqayyum/FlyRank_ML_Intern/main/work/ai_fluency_build_core/mcp_tool_execution_evidence.svg)
<!-- slide -->
### Eval Case 1: Page 1 High-Impression CTR Collapse
- **Input Scenario:** Article `cnt_937b2d18`, 15,400 impressions, Page 1 position (pos 4.2), CTR 0.35%, age 140d, trend -22%.
- **Expected Agent Behavior:** Identifies high decay probability (`rf_prob` >= 0.75), assigns reason code `low_ctr_visible_page`, recommends action "Refresh & Review CTR (Meta Title / Snippet Update)", assigns HIGH priority.
- **Pass Criteria:** Correct reason code assigned; suggestion focuses on CTR/snippet optimization rather than full article rewrite.

<!-- slide -->
### Eval Case 2: Evergreen Pillar Page (False Positive Risk)
- **Input Scenario:** Article `cnt_e84f9a12`, 8,500 impressions, pos 14.5, age 450d, trend +12.4%.
- **Expected Agent Behavior:** Recognizes older age (450d) but detects positive trend (+12.4%). Scores moderate risk (`rf_prob` <= 0.40), assigns action "Monitor", places in LOW priority queue.
- **Pass Criteria:** Agent does NOT recommend a $300 editorial rewrite on a page with positive traffic momentum.

<!-- slide -->
### Eval Case 3: Immature Content Filtering
- **Input Scenario:** Article `cnt_54c12d90`, 500 impressions, age 45d, trend -10%.
- **Expected Agent Behavior:** Automatically filters out item during Step 1 query phase due to rule `content_age_days < 90`.
- **Pass Criteria:** Item excluded from refresh scoring queue with log note "Immature content (<90 days)".

<!-- slide -->
### Eval Case 4: SERP Layout Shift (AI Overview Snippet)
- **Input Scenario:** Article `cnt_33e45f12`, 12,000 impressions, pos 2.1, CTR 1.8%, age 110d, trend -18.4%. `fetch_serp_context` returns `ai_overview_present: true`.
- **Expected Agent Behavior:** Detects low model probability on standard features, but SERP tool flags AI Overview presence. Assigns reason code `serp_layout_shift` and recommends "Schema & Direct Answer Snippet Optimization".
- **Pass Criteria:** Incorporates SERP context tool output to override false-negative tendency.

<!-- slide -->
### Eval Case 5: Database Connection Timeout / Missing Vector
- **Input Scenario:** `query_content_performance_db` returns empty payload or malformed JSON connection error.
- **Expected Agent Behavior:** Catches error gracefully, logs diagnostic error message, retries once, and notifies user without crashing workflow.
- **Pass Criteria:** Zero uncaught exceptions; fallback notification emitted to user dashboard.
```

---

## 5. Risks, Guardrails & Safety Design

```
+-----------------------------------------------------------------------------------+
|                               AGENT GUARDRAIL MATRIX                              |
+-----------------------------------------------------------------------------------+
|  RISK CATEGORY        |  HAZARD DESCRIPTION            |  MANDATORY GUARDRAIL     |
+-----------------------+--------------------------------+--------------------------+
| Irreversible CMS Edit | Auto-publishing unreviewed     | HARD BLOCK: Agent can    |
|                       | rewrites to live websites.     | ONLY write to "Draft"    |
|                       |                                | tickets in Notion/GitHub.|
+-----------------------+--------------------------------+--------------------------+
| Data Leakage          | Sending PII or client names    | DATA MASKING: All IDs    |
|                       | to external search APIs.       | pseudonymized (`cli_X`). |
|                       |                                | PII stripped before API. |
+-----------------------+--------------------------------+--------------------------+
| Budget Misallocation  | Recommending $500 rewrites on  | SKEPTIC AUDIT REQUIREMENT|
|                       | stable evergreen pages.        | Agent must output "What  |
|                       |                                | Would Make It Wrong".    |
+-----------------------+--------------------------------+--------------------------+
| Model Hallucination  | Inventing fake CTR/position    | GROUNDED TOOL CHECKS:    |
|                       | metrics not in database.       | All numbers verified     |
|                       |                                | against DB payload.      |
+-----------------------------------------------------------------------------------+
```

### Confirmation Protocols (Human-in-the-Loop)
- **Ticket Creation Confirmation:** Agent requires human confirmation before creating external GitHub/Notion editorial tickets when priority is MEDIUM or LOW.
- **High-Spend Threshold:** Any recommendation implying full content overhaul (>2,000 word rewrite) requires explicit approval from the content strategist.

---

## 6. Platform Choice & Justification

### Selected Platform: **n8n Agent Workflow Engine + Scripted Python Tools & Claude API**

#### Justification vs. Alternative Platforms:
1. **vs. Custom GPT (OpenAI):** Custom GPTs lack local database access, cannot query local DuckDB/SQLite instances without exposing custom webhooks to the public internet, and operate within rigid OpenAI sandbox limits.
2. **vs. Claude Cowork / Claude Projects:** While Claude Projects support artifacts and custom skills, they lack native automated cron triggers, webhook listeners, and visual node-based debugging for multi-step tool pipelines.
3. **Why n8n + Scripted Python Tools:**
   - **Cost & Ownership:** 100% free and open-source self-hostable workflow engine.
   - **Security & Privacy:** Local execution ensures client analytics data never leaves our controlled environment.
   - **Visual Debugging & Triggers:** Native support for scheduled cron scans, visual error-handling branches, and human-in-the-loop approval nodes.

---

## 7. Build Scope & 10-Hour Execution Plan

```
[Hour 1-3: Connector & DB Setup] ──► [Hour 4-6: Prompt & Reason Engine] ──► [Hour 7-8: Eval Suite] ──► [Hour 9-10: Guardrails & Docs]
```

- **Hours 1–3 (Connectors & Data Layer):** Set up n8n instance, configure DuckDB Python query script (`query_content_performance_db`), and verify ML model scoring endpoint (`compute_refresh_score`).
- **Hours 4–6 (Instructions & Reason Code Logic):** Implement system instructions, build SERP context verification tool, and code decision rules for reason code assignment.
- **Hours 7–8 (Evaluation Suite Execution):** Run all 5 pre-build eval cases, benchmark agent output against expected results, and tune system prompts.
- **Hours 9–10 (Guardrails, Error Handling & Final Spec):** Test human-in-the-loop approval nodes, verify PII masking, complete design documentation, and commit to repo.

---

## 8. Verification Matrix & Rubric Self-Check

| Rubric Axis | Requirement | Status | Verification Evidence |
| :--- | :--- | :---: | :--- |
| **Achievable Scope** | Fits roughly 10 build hours | ✅ PASS | Detailed 4-phase execution timeline mapped above. |
| **Realistic Access Plan** | Every tool and data source has clear auth/access plan | ✅ PASS | Read-only DuckDB, local ML model, free SERP API, scoped Notion API. |
| **Pre-Build Evals** | 5+ eval cases defined before building | ✅ PASS | 5 concrete test cases specified with inputs, expected behavior, and pass criteria. |
| **Guardrails & Safety** | Specified for risky or irreversible actions | ✅ PASS | Hard block on live CMS publishing, PII masking, human-in-the-loop confirmation. |
| **Platform Justification** | Platform choice justified against alternatives | ✅ PASS | Detailed comparison of n8n + Scripted Python vs Custom GPT and Claude Cowork. |
