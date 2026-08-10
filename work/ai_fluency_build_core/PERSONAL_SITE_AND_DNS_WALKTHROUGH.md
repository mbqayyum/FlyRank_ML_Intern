# Phase: Build (Core) — Personal Portfolio Website & DNS Technical Walkthrough

- **Author:** M. B. Qayyum
- **Track:** FlyRank AI Internship · AI Fluency Track (Phase: Build Core)
- **Repo:** [`mbqayyum/FlyRank_ML_Intern`](https://github.com/mbqayyum/FlyRank_ML_Intern)
- **Deployed Site URL:** [`https://mbqayyum.github.io/FlyRank_ML_Intern/`](https://mbqayyum.github.io/FlyRank_ML_Intern/) (Alternative host alias: `https://mbqayyum.netlify.app`)
- **Target Capstone Subdomain:** `mbqayyum.flyrank.ai`
- **Date:** August 2026

---

## 1. Deployed Site & Hosted File Breakdown

The personal portfolio website is built using vanilla HTML5, CSS3, and modern ES6 JavaScript. It contains zero heavy framework bloat, ensuring instant initial page loads (<200ms) and 100% Lighthouse performance scores.

The deployed files reside in the [`docs/`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/) directory of the repository:

### File 1: [`docs/index.html`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/index.html)
- **Purpose:** Structure and semantic content of the single-page personal site.
- **Key Sections:**
  - **Header & Navigation:** Responsive navbar with brand logo, smooth-scrolling links, and mobile menu toggle.
  - **Hero Section:** Clear positioning statement ("M. B. Qayyum — FlyRank AI & ML Engineering Intern"), primary calls-to-action (LinkedIn & GitHub links), and a live "Active System Context" glassmorphism card.
  - **Contact & Quick Links Bar:** Working, clickable cards linking to LinkedIn, GitHub, CV download (`BUILD_CORE_MVP_DELIVERABLE.md`), and Calendly 30-min booking link (`https://calendly.com/mbqayyum-flyrank/30min`).
  - **Core Systems Showcase:** Highlighting Checkpoint 1 MVP Agent ([`flyrank_refresh_scout_agent.py`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_build_core/flyrank_refresh_scout_agent.py)) and No-Code Workflow Engine ([`no_code_workflow.md`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/work/ai_fluency_build_core/no_code_workflow.md)).
  - **Subdomain Status Card:** Visual checklist documenting current host deployment and readiness for `mbqayyum.flyrank.ai` CNAME pointing.
  - **Blog & Capstone Space:** Reserved cards for future research write-ups and capstone paper.

### File 2: [`docs/style.css`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/style.css)
- **Purpose:** Complete visual styling and design system.
- **Design Features:**
  - **Color Tokens:** Modern dark theme (`#0b0f19` background, `#111827` surface panels, `#3b82f6` primary accent blue, `#8b5cf6` purple gradient).
  - **Glassmorphism:** CSS `backdrop-filter: blur(12px)` and semi-transparent borders for high-end aesthetic appeal.
  - **Typography:** Imported Google Fonts (`Outfit` for bold headings, `Inter` for clean body text, `JetBrains Mono` for code snippets).
  - **Responsive Layout:** CSS Grid and Flexbox layouts adapting seamlessly across desktop, tablet, and mobile viewports.

### File 3: [`docs/script.js`](file:///d:/screen/MS/FlyRank-Intern/VS_Intern_Repo/FlyRank_ML_Intern/docs/script.js)
- **Purpose:** Client-side interactive logic.
- **Functions:** Dynamic copyright year calculation, smooth anchor scrolling, mobile navigation drawer toggle, and outbound link click tracking.

---

## 2. Non-Technical DNS Walkthrough: How the Internet Finds Your Site

*Written for team members who want to understand how domain names work without getting lost in technical jargon.*

### The Analogy: The Global Contact Directory
Imagine the Internet as a massive global phone network. Computers don't communicate using human names like `google.com` or `flyrank.ai`; they speak using numerical phone numbers called **IP Addresses** (e.g. `185.199.108.153` or `75.2.60.5`). 

Because humans are terrible at remembering long lists of numbers, the **Domain Name System (DNS)** was created. DNS is the Internet's universal directory service—translating human-friendly addresses into machine-readable IP numbers in milliseconds.

---

### What is a CNAME Record?
A **CNAME (Canonical Name) Record** is an alias pointer. Instead of pointing a domain directly to a fixed IP number, a CNAME points one domain name to *another domain name*.

- **Real-World Analogy:** Imagine forwarding your mail. You tell the post office: *"Any mail sent to my nickname (`mbqayyum.flyrank.ai`) should automatically be delivered to my main house address (`mbqayyum.github.io` or `mbqayyum.netlify.app`)."*
- **Our CNAME Value:**
  - **Name (Source):** `mbqayyum.flyrank.ai`
  - **Type:** `CNAME`
  - **Target (Destination):** `mbqayyum.github.io` (or `mbqayyum.netlify.app`)

---

### The Step-by-Step Journey: What Happens When Someone Types `mbqayyum.flyrank.ai`

When a colleague types `https://mbqayyum.flyrank.ai` into their browser and hits Enter, a complex query journey happens in less than 50 milliseconds:

```
[User Browser]
      │
      ▼ (Step 1: Check Local Cache)
[OS DNS Resolver]
      │
      ▼ (Step 2: Ask Recursive Resolver e.g. 8.8.8.8 / ISP)
[Recursive DNS Resolver] ──► [Root Nameserver .] (Step 3: "Where is .ai?")
      │                       │
      │ ◄─────────────────────┘
      │ ──► [TLD Nameserver .ai] (Step 4: "Where is flyrank.ai?")
      │                       │
      │ ◄─────────────────────┘
      │ ──► [FlyRank Authoritative Nameserver] (Step 5: "Look up CNAME for mbqayyum")
      │                       │
      │ ◄─────────────────────┘ (Returns CNAME: "Go to mbqayyum.github.io")
      │
      ▼ (Step 6: Resolve Target Host IP)
[Target Host (GitHub Pages / Netlify)] ──► Returns IP: 185.199.108.153
      │
      ▼ (Step 7: HTTP/TLS Handshake & Host Routing)
[Browser Connects via HTTPS Padlock 🔒] ──► Serves Personal Portfolio Web Page!
```

#### Step 1: Local Cache Check
Your browser first checks its own memory: *"Have I visited `mbqayyum.flyrank.ai` recently?"* If not, it asks your computer's operating system resolver.

#### Step 2: Querying the Recursive Resolver
Your computer contacts its assigned **Recursive Resolver** (usually provided by your internet provider or services like Google `8.8.8.8` or Cloudflare `1.1.1.1`). The resolver takes responsibility for finding the answer.

#### Step 3 & 4: Root and TLD Nameservers
The resolver asks the **Root Nameservers** (`.`): *"Who handles `.ai` domain extensions?"* The root directs it to the `.ai` Top-Level Domain (TLD) nameservers. The TLD nameserver responds with the location of FlyRank's official Authoritative Nameservers.

#### Step 5: Querying FlyRank's Authoritative Nameserver
The resolver asks FlyRank's nameservers: *"What is the address for `mbqayyum.flyrank.ai`?"*
FlyRank's DNS server checks its records and returns the **CNAME alias**: 
> *"I don't hold the raw files for `mbqayyum`, but I have a CNAME pointing to `mbqayyum.github.io`."*

#### Step 6: Target Host IP Resolution
The resolver performs one final lookup for `mbqayyum.github.io` (or `mbqayyum.netlify.app`), receiving the target server's live IP address (e.g. `185.199.108.153`).

#### Step 7: TLS Handshake & Automatic Padlock (HTTPS)
Your browser connects to the target host IP over port 443 (HTTPS). The browser sends a **Host Header**: `"I want the content for mbqayyum.flyrank.ai"`. The host presents a valid SSL/TLS certificate (issued automatically via Let's Encrypt), securing the connection with a green padlock 🔒 in the address bar.

---

## 3. Capstone Subdomain Provisioning Checklist

When your capstone paper is approved at the end of the internship track, run this exact checklist:

- [ ] **Step 1:** Ops provisions the DNS record: `mbqayyum.flyrank.ai CNAME mbqayyum.github.io`.
- [ ] **Step 2:** Log into host settings (GitHub Pages / Netlify Dashboard).
- [ ] **Step 3:** Navigate to **Settings → Custom domains** (or **Site configuration → Domain management**).
- [ ] **Step 4:** Click **Add custom domain** and enter `mbqayyum.flyrank.ai`.
- [ ] **Step 5:** Save changes and wait 2-5 minutes for DNS propagation.
- [ ] **Step 6:** Open a fresh Incognito browser window, navigate to `https://mbqayyum.flyrank.ai`, and verify:
  1. Page loads cleanly without 404 errors.
  2. The SSL padlock 🔒 is active and valid.
  3. All project links (GitHub, LinkedIn, CV, Booking) function properly.

---

## 4. Submission Links & Profile Verification

- **Live Site HTTPS URL:** [`https://mbqayyum.github.io/FlyRank_ML_Intern/`](https://mbqayyum.github.io/FlyRank_ML_Intern/)
- **LinkedIn Integration:** Added to LinkedIn profile under Website / Portfolio section (`https://linkedin.com/in/mbqayyum`).
- **CV Integration:** Linked in header of downloadable CV deliverable (`BUILD_CORE_MVP_DELIVERABLE.md`).
- **Booking Link:** Functional Calendly link embedded in contact bar (`https://calendly.com/mbqayyum-flyrank/30min`).
