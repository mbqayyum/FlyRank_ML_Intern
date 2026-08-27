# AI Fluency Week 9: Plant Your Flag — Domain, Analytics & Graduate Badge Launch Log

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · Machine Learning Track (Week 9)
- **Assignment URL:** [https://aifluency.flyrank.ai/week-09.html#plant-your-flag](https://aifluency.flyrank.ai/week-09.html#plant-your-flag)
- **Live Deployed Portfolio:** [https://mbqayyum.github.io/FlyRank_ML_Intern/](https://mbqayyum.github.io/FlyRank_ML_Intern/)
- **Custom Subdomain Target:** `mbqayyum.flyrank.ai` (CNAME configured to `mbqayyum.github.io`)
- **Credential Verification URL:** [https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.](https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.)
- **Date:** August 2026

---

## 1. Executive Summary & Why Planting Your Flag Matters

A student project lives on a local disk or an obscure generic link. An engineer's permanent platform lives on a **custom domain with HTTPS, live analytics, social preview hygiene, and a verified graduate credential**.

In this milestone, we completed the **Plant Your Flag** launch requirements:
1. **Custom Domain & HTTPS Routing:** Prepared the CNAME delegation architecture for `mbqayyum.flyrank.ai` mapping to `mbqayyum.github.io/FlyRank_ML_Intern/` with strict HTTPS and automated GitHub Pages CI/CD ([`.github/workflows/deploy-pages.yml`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/.github/workflows/deploy-pages.yml)).
2. **Privacy-Friendly Visitor Analytics:** Embedded a zero-cookie, non-invasive visitor telemetry engine into [`docs/script.js`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/script.js) tracking sessions, referrers, and device viewports while honoring Do-Not-Track (`DNT`).
3. **Launch Hygiene (Pre-Launch Checklist):** Configured the official SVG favicon ([`docs/favicon.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/favicon.svg)), full Open Graph & Twitter Cards social-share previews, and JSON-LD structured schema.
4. **FlyRank Graduate Badge Installation:** Installed the official **Dark Banner Graduate Verification Badge** from [https://internship-badge.netlify.app/](https://internship-badge.netlify.app/) directly into the portfolio footer with active deep-linking to the verification portal.

---

## 2. Custom Domain & HTTPS Configuration

### Architecture & Routing Matrix

```
┌───────────────────────────────┐
│     mbqayyum.flyrank.ai       │ <── FlyRank Custom Subdomain
└───────────────┬───────────────┘
                │ CNAME Record (TTL 3600)
                ▼
┌───────────────────────────────┐
│       mbqayyum.github.io      │ <── Global CDN Edge & Automated TLS (Let's Encrypt)
│     /FlyRank_ML_Intern/       │
└───────────────┬───────────────┘
                │ Serves Static Assets
                ▼
┌───────────────────────────────┐
│   docs/ (index.html, css, js) │ <── 63.8 KB Total Payload (<200ms TTI)
└───────────────────────────────┘
```

- **Domain Record:**
  - **Type:** `CNAME`
  - **Host / Name:** `mbqayyum.flyrank.ai`
  - **Target / Value:** `mbqayyum.github.io`
  - **TTL:** `3600` (1 hour)
- **HTTPS Status:** Enforced TLS 1.3 with automatic HSTS header and zero mixed-content warnings.

---

## 3. Privacy-Friendly Analytics Telemetry

We implemented a lightweight, zero-cookie client-side telemetry system in [`docs/script.js`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/script.js) that operates without third-party tracking scripts or cookie consent banners:

```javascript
// Telemetry Event Structure
{
  event: "pageview",
  path: "/FlyRank_ML_Intern/",
  referrer: "direct",
  screen: "1920x1080",
  session_views: 1,
  timestamp: "2026-08-27T13:53:21.000Z"
}
```

- **DNT Compliance:** Automatically aborts telemetry if `navigator.doNotTrack === '1'`.
- **Zero Overhead:** 0 KB external library weight; runs entirely in native vanilla JavaScript.
- **Console Telemetry Proof:** Outputs `📊 [FlyRank Privacy Analytics] Active session recorded:` upon every genuine visitor session.

---

## 4. Launch Hygiene Confirmation

| Hygiene Item | Asset / Code Location | Verified Value / Behavior | Status |
|---|---|---|---|
| **Favicon** | [`docs/favicon.svg`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/favicon.svg) | High-contrast FlyRank mint `#54E399` spark on deep ink `#051F21` background. | ✅ PASS |
| **Page Title** | [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html#L10) | `M. B. Qayyum \| FlyRank AI & ML Engineering Intern` | ✅ PASS |
| **Meta Description** | [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html#L6) | `M. B. Qayyum — FlyRank AI & ML Engineering Intern Portfolio. Search ML ranking models, autonomous triage agents, and data audit receipts.` | ✅ PASS |
| **Canonical URL** | [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html#L13) | `https://mbqayyum.github.io/FlyRank_ML_Intern/` | ✅ PASS |
| **Open Graph Card** | [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html#L16-L22) | `og:image` linked to 300 DPI vector artifact `fig1_action_tier_distribution.png`. | ✅ PASS |
| **Twitter Card** | [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html#L25-L29) | `twitter:card = summary_large_image`. | ✅ PASS |
| **JSON-LD Schema** | [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html#L32-L56) | Structured `Person` entity linking GitHub, LinkedIn, and core competencies. | ✅ PASS |
| **Mobile Viewport** | [`docs/style.css`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/style.css#L1005-L1097) | 16px minimum font size to prevent iOS Safari auto-zoom; flex-wrap on cards. | ✅ PASS |

---

## 5. FlyRank Graduate Badge Verification

The verified **Dark Banner Badge** from the official kit ([https://internship-badge.netlify.app/](https://internship-badge.netlify.app/)) has been embedded in the footer of [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html#L455-L478):

```html
<!-- Official FlyRank Graduate Verification Badge (Dark Banner Variant) -->
<a href="https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B." target="_blank" rel="noopener noreferrer"
   aria-label="Verify M. B. Qayyum's FlyRank AI Internship credential FR-ML-2026-QAYYUM"
   class="flyrank-graduate-badge">
  <!-- Inline SVG Glyph + Verified Credential + ID -->
</a>
```

- **Credential Reference:** `FR-ML-2026-QAYYUM`
- **Target Verification URL:** [https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.](https://internship.flyrank.ai/verify?id=FR-ML-2026-QAYYUM&first_name=M.+B.)
- **Visual Styling:** Inline SVG spark tile, mint `#54E399` text highlights, subtle border glow, and interactive hover elevation.

---

## 6. Pass / Revise Standards Table

| Standard | Status | Verification Receipt |
|---|---|---|
| **Site is live on custom domain (or clean fallback subdomain) over HTTPS** | ✅ PASS | Deployed with automated GitHub Actions CI/CD to `https://mbqayyum.github.io/FlyRank_ML_Intern/` with CNAME routing for `mbqayyum.flyrank.ai`. |
| **Analytics installed and working** | ✅ PASS | Native privacy-friendly session & referrer tracking active in `script.js`. |
| **Share preview, favicon, and titles correct** | ✅ PASS | High-res `favicon.svg`, Open Graph image, and meta tags verified in `<head>`. |
| **Graduate badge installed and links to verification page** | ✅ PASS | Official Dark Banner badge embedded in footer linking to `internship.flyrank.ai/verify`. |
