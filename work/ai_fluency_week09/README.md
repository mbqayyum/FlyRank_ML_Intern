# AI Fluency Week 9: Break Your Own Site (Hardening & Diligence)

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Week 9)
- **Assignment URL:** [https://aifluency.flyrank.ai/week-09.html#break-your-own-site](https://aifluency.flyrank.ai/week-09.html#break-your-own-site)
- **Live Deployed Portfolio:** [https://mbqayyum.github.io/FlyRank_ML_Intern/](https://mbqayyum.github.io/FlyRank_ML_Intern/)
- **Repo:** [mbqayyum/FlyRank_ML_Intern](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Date:** August 2026

---

## Deliverables in this folder:

1. **[`break_your_own_site_hardening_log.md`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week09/break_your_own_site_hardening_log.md):** Complete assignment deliverable containing:
   - The honest **"Where It Breaks" list** across 8 adversarial test vectors.
   - **Triage Matrix:** 6 Fix-Nows resolved vs. 3 Known Limitations documented.
   - **Live Fix Evidence:** Double-submit debounce lock, strict RFC email & name regex, AbortController 8s timeout, honeypot bot trap, live character counter, and XSS DOM escaping.
   - **Findability & SEO Upgrades:** Full Open Graph (`og:*`), Twitter Cards (`summary_large_image`), Canonical URL, and structured JSON-LD Schema (`Person` / `CreativeWork`).
   - **Speed & Payload Telemetry:** Verified total page footprint of **63.81 KB** (<100 KB budget, <200ms load time).
   - Pass / Revise verification table.

2. **[`hardening_flow.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_week09/hardening_flow.svg):** Standalone visual architecture diagram mapping adversarial test vectors to hardening interceptors and honest triage outcomes.

3. **Live Portfolio Hardening Receipts:**
   - Markup & SEO: [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html)
   - Hardened Controller: [`docs/script.js`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/script.js)
   - Design System Styles: [`docs/style.css`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/style.css)

---

## Pass / Revise Verification

| Standard | Status | Evidence |
|---|---|---|
| **Adversarial edge cases tested** | ✅ PASS | Form tested empty, with garbage strings, rapid double-click, and simulated network timeouts. |
| **Basic SEO / meta & speed checked** | ✅ PASS | Open Graph, Twitter Cards, Canonical tag, JSON-LD Schema added; 63.8 KB total payload verified. |
| **Findings triaged honestly** | ✅ PASS | 6 Fix-Nows implemented live; 3 Known Limitations documented transparently. |
| **Hardening review completed** | ✅ PASS | Full code receipts committed to `docs/` and documented in hardening log. |
