# circles — The internet's reading room.

**Product Requirements Document & Roadmap**  
**Version:** 5.2 | **Date:** March 2026 | **Stage:** Pre-Seed / Ideation  
**Category:** Hybrid Async/Sync Social Network  
**Author:** Arun Mohanan | **Company:** CausalSyntax  
**Website:** causalsyntax.com

---

## 1. Executive Summary & Vision

**Vision Statement**  
Circles is the digital twin of the cafe and the library — an anti-vanity social network that seamlessly transforms shared interests into authentic, live conversations. It brings back the lost Third Place by replacing algorithmic outrage and performative metrics with deep content consumption and serendipitous, organic human connection.

**Core Paradigm**  
Users do not come to Circles primarily to chat. They enter a Reading Room to consume high-value content precisely tailored to specific facets of their identity. Social interaction is entirely opt-in — an organic byproduct of occupying that intellectual space — replicating the feeling of making eye contact and striking up a conversation with a stranger reading the same book at a teashop.

**The Opportunity in One Line**  
Every existing social platform optimises for attention. Circles optimises for resonance.

**Founding Context**  
Circles is the pilot product of CausalSyntax — a product company founded by Arun Mohanan with the mission of building human-centric digital spaces that respect attention, protect identity, and reward depth of engagement over breadth of reach. CausalSyntax is the house under which Circles and future products will be built, headquartered at causalsyntax.com.

---

## 2. Problem Statement

| Pain Point | Current Alternative | Circles Solution |
| :--- | :--- | :--- |
| **Performative social media fatigue** | Twitter/X, LinkedIn | Zero vanity metrics; no public likes or follower counts |
| **Context collapse across identities** | Single-profile networks | Isolated Personas per interest domain |
| **Cold-start for new communities** | Discord, Slack | Interest-tagged Reading Room from Day 1 |
| **Serendipity is dead online** | Algorithmic feeds | Ambient Collision Engine surfaces live co-presence |
| **Shallow live interactions** | Twitter Spaces, Clubhouse | Graduated: Note → Handshake → Table → Bloom |
| **No digital Third Place** | None | The Lobby replicates cafe-style organic social gravity |

---

## 3. Target Audience & Identity Architecture

### Primary User Archetypes

| Archetype | Description | Core Need |
| :--- | :--- | :--- |
| **The Evening Regular** | Professionals unwinding after work who crave casual, unstructured intellectual discussion without audience-building pressure | Low-friction ritual; serendipitous discovery |
| **The Circle Seeker** | Individuals actively forming functional cohorts — founders seeking co-founders, developers seeking collaborators, researchers seeking peers | Trust-based matchmaking beyond LinkedIn |
| **The Multifaceted Self** | Users with distinct, non-overlapping identities (e.g., a VC by day and a jazz musician by night) | No context collapse; true pseudonymity |
| **The Knowledge Curator** | Domain experts willing to host Stage events, share curated RSS stacks, and build reputation within a niche | Monetisable thought leadership without follower theatre |

### Identity Architecture: Dual-Identity System

*   **Base Profile (Private):** Legal name, master email/phone, date of birth, gender, location — stored securely, never surfaced publicly.
*   **Personas (Faceted):** Multiple isolated identities per user. Each Persona has its own alias, avatar, interest tags, Feed Wall, and collision history.
*   **Privacy Matrix:** Users explicitly toggle which Base Profile attributes (e.g., Location: 'Kerala, India') are shared on each Persona to establish contextual trust without full disclosure.
*   **No Context Collapse:** Each Persona is hermetically sealed. Activity, conversations, and connections in one Persona are invisible to others.

---

## 4. Product Architecture & Core Mechanics

Circles is structured as six sequential interaction phases, each unlocking the next through explicit user intent.

### Phase 1 — The Reading Room (Feed Wall)
The anchor experience. An addictively readable, LLM-curated library ensuring zero cold-start friction.
*   **Content Mix:** RSS-pulled articles, global news APIs, study reports, scientific journals, native webinars, and curated book recommendations — all summarised and formatted by an LLM pipeline before being mapped to the active Persona's interest tags.
*   **Zero Vanity:** No public likes, no comment sections, no follower counts, no share buttons.
*   **The Gravity Algorithm:** Feed items are ranked using: `Score = Priority / (Time + 2)^1.8`. This ensures the feed always feels fresh with the highest-quality content surfacing naturally, without relying on user engagement signals (clicks, likes, shares). `Priority` is derived from source trust score, LLM quality rating, and tag relevance to the active Persona.
*   **Ingestion Pipeline:** Background workers (BullMQ/Redis) run on CRON schedules to scrape whitelisted RSS feeds (arXiv, Hacker News, Substack), pass content through an LLM for formatting and summarisation, and inject the processed items into the database.
*   **Contextual Sponsored Cards:** Domain-matched sponsored content (courses, certification programmes, workshops) appears as clearly-labelled cards in the Feed Wall — at most 1 per 10 items. Sponsored cards are never shown inside active Lobbies, Tables, or Live Circles.

### The Shelf (Personal Space & Commerce)
The user's private library — a unified space for saved content, interest management, and knowledge commerce.
*   **Bookmarking:** Save articles from the Feed Wall for later reading, organised by Persona and interest tags.
*   **Interest Tag Management:** Follow, unfollow, and discover interest tags (e.g., #Philosophy, #Architecture). Tags drive Feed Wall personalisation.
*   **Purchased Media:** All purchased eBooks and digital media are housed here as a permanent personal collection.
*   **Book Discovery:** Curated books are surfaced inline in the Feed Wall alongside articles, linked to the active Persona's interest tags. Users add titles to a personal Reading List.
*   **Native E-Commerce:** Users can buy physical or digital books directly within the app.
    *   **Digital Books:** Purchased and readable entirely within the app via an embedded reader. Free eBooks open directly in-app.
    *   **Physical Books:** Purchases are processed through **Stripe**. Fulfilment is routed to a **dropshipping partner API** for order processing and delivery. A native, aesthetic **delivery tracking UI** is built into the Shelf, allowing users to monitor order status without leaving the app.

### Phase 2 — The Ambient Lobby (Sandbox)
*   **Collision Engine:** A background service continuously detects overlapping online Personas sharing interest tags and generates transient Lobbies / Collision Cards.
*   **Ambient Cue:** The user's active Persona avatar on the Feed Wall begins to gently glow — a soft, non-intrusive signal of co-presence.
*   **Lobby View:** Clicking the Collision Card drops the user into the unstructured Lobby where user personas visually "float" like bubbles.

### Phase 3 — The Open Note & Handshake
*   **Open Note:** A short, contextual text message (max 150 characters) dropped by a floating user. A visual indication shows they have dropped a note.
*   **Read & Engage:** Clicking the user reveals a bubble showing the note and a "Handshake" button.
*   **Handshake:** User A clicks Handshake on User B. User B receives a popup displaying User A's note and an Accept/Decline prompt. No unsolicited audio, ever.

### Phase 4 — The Table
*   **Spatial Isolation:** Upon a successful mutual Handshake, a connected visual boundary (e.g. dashed concentric circle) forms around User A and User B inside the Lobby itself.
*   **Audio-First:** An isolated WebRTC audio channel opens exclusively between them.
*   **Dynamic Expansion:** While at a Table, users can still read Lobby notes and Handshake a third Persona, seamlessly merging them into the existing audio channel. Other floating Lobby occupants can still see that a Table (circle) has formed.

### Phase 5 — The Bloom & Roots (Live Circle)
*   **Bloom Request:** Any Table participant clicks the "Bloom" button. Unanimous consent extracts the group entirely from the floating Sandbox into a new, dedicated page (The Live Circle).
*   **Video Escalation:** Inside the Live Circle, any user can request cameras on. Requires unanimous consent; otherwise the room remains strictly audio.
*   **No-Trace Default:** All conversation data evaporates on exit. Groups may opt to 'Plant Roots' to save the Circle boundaries and enable future async meetups.

### Phase 6 — The Stage (Broadcasting & Webinars)
*   **Event Scheduling:** Verified Personas or organisations schedule Stage events (Free or Ticketed) with tags for discoverability.
*   **Discovery:** Stage cards embed natively in relevant Personas' Feed Walls.
*   **Mechanics:** Broadcaster (A/V enabled) + Audience (listen-only) model with a Stage Sandbox for Q&A notes. Powered by **LiveKit (WebRTC)** for sub-50ms latency.
*   **Replays:** Hosts record and publish Stages; replays appear in attendee feeds.
*   **Guest Access via Shared Link:** Anyone with a shared Stage link can join a scheduled live broadcast in **strict view-only mode** — no interaction, no Q&A, no profile visibility. Access to recorded replays, Q&A participation, and any interactive features requires a registered Circles account.

### The Web Dashboard (Next.js — Role-Based)
A single Next.js web application serving two audiences based on login role: **Partner Dashboard** for B2B creators/publishers and **Admin Dashboard** for the internal Circles team.

#### Partner Dashboard (B2B Creators & Publishers)
*   **Stage Studio:** Where creators schedule upcoming broadcasts and manage their **OBS Stream Keys** for professional broadcasting setups.
*   **Deep Attention Analytics:** Since public metrics are hidden from consumers, partners get private dashboards with honest attention data:
    *   **Content Analytics:**
        *   **Dwell Time** — Average time users actively spend reading a specific article.
        *   **Completion Rate** — Percentage of an article's content that users consume (scrolled past 80% = complete).
        *   **Total Impressions** — Number of times the article appeared in users' Feed Walls.
        *   **Unique Readers** — Deduplicated count of Personas who opened the article.
        *   **Bookmark Rate** — Percentage of readers who saved the article to their Shelf.
        *   **Reader Interest Distribution** — Anonymised breakdown of which interest tags the article's readers follow.
    *   **Stage Analytics:**
        *   **Live Attendance** — Peak and average concurrent viewer count during a broadcast.
        *   **Watch Duration** — Average time spent in the Stage per viewer.
        *   **Replay Views & Completion** — Total replay views and average completion rate.
        *   **Q&A Engagement** — Number of notes submitted during the Stage Sandbox.
        *   **Guest vs. Registered Split** — Ratio of authenticated viewers to guest (shared-link) viewers.
    *   **Commerce Analytics:**
        *   **Book Sales Count** — Units sold (physical + digital) attributed to the partner.
        *   **Revenue Breakdown** — Gross and net revenue by book, by type (physical vs. digital).
        *   **Feed-to-Purchase Conversion** — Percentage of Feed Wall impressions that led to a purchase.
*   **Financials:** **Stripe Connect** integration so creators can track book sales and event ticket revenue, view transaction history, and receive automated payouts.

#### Admin Dashboard (Internal Circles Team)
*   **Platform Analytics (Global):**
    *   **Engagement:** Total Weekly Active Reading Time (WART), DAU/MAU trends, average sessions per user, global interest tag heatmaps (which topics are trending).
    *   **Retention:** D1/D7/D30 cohorts separated by Persona type and acquisition channel.
    *   **Conversion Funnels:** View-to-Signup, Signup-to-Persona, Impression-to-Purchase (Global).
*   **Partner & Content Analytics:**
    *   **Partner Leaderboard:** Ranking by Dwell Time, sales volume, and Stage attendance.
    *   **Content Performance:** Global top-performing articles, top RSS sources by "Gravity Score" yield.
    *   **Ingestion Pipeline:** Success/failure rates per source, LLM summarisation quality audit, processing latency.
*   **Financial Health:**
    *   **Gross Platform Revenue:** Real-time tracking across all streams.
    *   **Net Revenue:** Revenue after Stripe fees and Partner payouts.
    *   **Commerce Funnel:** Total book sales (physical vs. digital) and average order value (AOV).
*   **Moderation & Safety:**
    *   **Content Moderation:** Flagged content queue, source whitelist/blacklist management, ability to remove or suppress feed items.
    *   **User Moderation:** Flagged accounts, Persona isolation audit logs, suspension/banning tools.
*   **Infrastructure Health:**
    *   **System Performance:** API latency, error rates, database CPU/Memory usage.
    *   **Real-time Engine:** LiveKit session counts, concurrent broadcast metrics, WebRTC latency tracking.
    *   **Worker Queue:** BullMQ job status, Redis memory usage, CRON job logs.

---

## 5. Detailed User Flows & Edge Cases

### Flow 1 — Onboarding & Identity Generation
1. **Auth:** OAuth (Google/Apple) or Phone (OTP). No passwords, no magic links.
2. **Base Setup:** User submits private PII: Date of Birth, Gender, Location (mandatory). Stored encrypted; never displayed.
3. **Persona Creation:** User defines Alias, selects Core Interest Tags (min 2, max 10), sets Privacy Matrix toggles, and selects an avatar from a generated set.
4. **Entry:** App drops user directly into the Reading Room for Persona A. Feed is immediately populated — zero cold-start.

**Edge Cases:**
*   **Underage user detected:** Graceful rejection with explanation; account not created.
*   **Skips Persona creation:** Blocked with a contextual prompt; cannot proceed without at least one.

### Flow 2 — The Sponsored Connections Flow
1. **Card Impression:** Sponsored card appears in the Feed Wall. Contains title, 2-line description, and single CTA — 'I'm Interested'.
2. **Interest Flag:** User taps CTA. Bottom sheet prompts for available windows (e.g., 'Weekday evenings'). User's Persona ID and availability passed to sponsor — zero PII.
3. **Sponsor Schedules:** Sponsor proposes session time within the user's window based on the anonymous flag.
4. **User Confirms:** User receives notification to Accept or Decline the proposed time.
5. **The Session:** Dedicated Consultation Circle (private Live Circle) opens natively. All audio-first, video requires consent.

---

## 6. Technical Architecture Summary

### Core Services
| Domain | Key Services | Recommended Stack |
| :--- | :--- | :--- |
| **Identity & Auth** | Dual persona management, Privacy Matrix | Supabase Auth + Row-Level Security |
| **Content / Feed** | RSS, News API, Feed ranking, Bookshelf | Python (Celery) workers; PostgreSQL |
| **Presence & Collision**| Online status, Lobby matching | Redis pub/sub; Supabase Realtime |
| **Real-Time Comms** | WebRTC audio/video, Open Notes | LiveKit (SFU) for WebRTC |
| **Payments** | Ticketed Stages, Sponsored Connections, Book Commerce | Stripe + Stripe Connect |
| **Fulfilment** | Physical book order routing, delivery tracking | Dropshipping Partner API |
| **Web Dashboard** | Partner Dashboard (analytics, Stage Studio, financials) + Admin Dashboard (platform ops, moderation, pipeline health) | Next.js (React) — role-based |

### Tech Stack
| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Consumer App (Mobile + Web)** | React Native (Expo) + Reanimated 3 | Fluid, 60fps UI transitions — ships on iOS, Android, and Web |
| **Web App (Dashboard)** | Next.js (React) | Unified role-based Web Dashboard (Partner + Admin) + Stage web listening |
| **Backend & APIs** | NestJS (Node.js) | Central API layer — the application's nervous system |
| **Database** | PostgreSQL (via Prisma ORM) | Unified storage: Users, FeedItems, Orders, StageEvents |
| **Ingestion Pipeline** | NestJS workers + BullMQ/Redis | CRON-scheduled RSS scraping → LLM processing → DB injection |
| **Audio/Video Engine** | LiveKit (WebRTC) | Stage broadcasts with sub-50ms latency |
| **Payments** | Stripe + Stripe Connect | Consumer purchases, creator payouts, ticketed events |
| **Fulfilment** | Dropshipping Partner API | Physical book order routing and delivery tracking |

### Technical Constraints & Decisions
*   **No ML in MVP:** Feed ranking uses the deterministic Gravity Algorithm + tag-match weighting. True ML personalisation is a post-MVP investment.
*   **LLM Pipeline:** Content summarisation and formatting is handled as a batch process in the ingestion pipeline — not at read-time — ensuring consistent feed performance.
*   **Audio-First Priority:** Video is gated behind explicit consent and deprioritised to reduce LiveKit cost and complexity.
*   **Mobile-First, Web Too:** React Native (Expo) is the primary surface, shipping on iOS, Android, and Web. Next.js serves the B2B Partner Dashboard and Stage web listening separately.

---

## 7. Monetisation & Business Model

Revenue must reinforce, not erode, the core user experience. No intermediary data brokering.

| Stream | Model | Notes |
| :--- | :--- | :--- |
| **Circles Pro** | ₹499/mo or ₹3,999/yr | Unlimited Personas, advanced Privacy Matrix, Roots history, offline eBooks |
| **Stage Tickets** | 5–15% platform fee | Host sets price via Stripe |
| **Sponsored Connections** | CPM + 20% booking fee | Tag-matched sponsor cards. Booked sessions via Interest Flag |
| **eBook Sales**| 15–30% platform margin | Paid eBooks purchased and read in-app via embedded reader |
| **Physical Book Sales**| Margin on dropshipped orders | Stripe checkout → Dropship partner fulfilment; native delivery tracking UI |
| **Circles for Teams (B2B)**| Per-seat SaaS (Phase 2) | Private Lobbies + Stages for companies |

---

## 8. Success Metrics & KPIs

**North Star Metric:** Weekly Resonant Connections (WRC) — the number of unique pairs of users who complete a Handshake and spend ≥ 5 minutes at a Table in a given week.

| Layer | Metric | MVP Target | Definition |
| :--- | :--- | :--- | :--- |
| **Acquisition** | Organic Signups / Week | 200 by Month 3 | New Base Profiles created without paid ads |
| **Activation** | Persona Completion Rate | > 80% | Users who complete ≥ 1 full Persona setup |
| **Social** | Lobby Entry Rate | > 40% of DAU | Daily active users who enter ≥ 1 Lobby |
| **Social** | Handshake Conversion | > 25% | % of Open Notes that result in a completed Handshake |
| **Retention** | D7 Retention | > 35% | Users returning within 7 days of first session |
| **Health** | Collision Engine Efficacy | > 60% | % of Lobby entries that result in ≥ 1 Open Note |
| **Guardrail** | Persona Isolation Violations | Zero | Any cross-Persona data leak is a Sev-1 incident |

---

## 9. Product Roadmap

| Phase | Timeline | Deliverables | Success Gate |
| :--- | :--- | :--- | :--- |
| **Phase 0: Foundation** | M0–M2 | Base Profile + Personas, Feed Wall (RSS/News), Privacy Matrix, Collision Engine (Tag-match), Book Shelf v1 (Free + Affiliate) | 100 beta users; D7 retention > 30%; Zero Isolation Bugs |
| **Phase 1: Core Social**| M3–M6 | Lobby/Sandbox UI, Open Notes, Handshake, Table (Audio WebRTC), Bloom, No-Trace Rule / Roots, Sponsored Connections v1 | WRC > 50/week; Handshake Conv > 20% |
| **Phase 2: Monetisation**| M7–M12 | The Stage, Circles Pro sub, Paid in-app eBooks, Sponsor Dashboard | ₹10L MRR; Pro conversion > 4% |
| **Phase 3: Expansion** | M13–M18 | Circles for Teams (B2B), ML-feed ranking, Publisher API for eBooks | Series A raise; 50K MAU |

---

## 10. Competitor Positioning

| Product | Model | Core Mechanic | Circles Differentiation |
| :--- | :--- | :--- | :--- |
| **Clubhouse**| Social Audio | Drop-in audio rooms | No serendipity mechanic; fame-based; Circles relies on ambient reading presence + Handshake |
| **X Spaces** | Social Audio | Audio tied to followers | Follower-dependent discovery; Circles has zero vanity metrics/follower counts |
| **Discord** | Community Chat | Persistent text/voice | High friction cold-invite; Circles uses organic dynamic Lobby formation |
| **LinkedIn** | Professional Graph | Feed + Resume theatre | Vanity metrics; Circles replaces status with substance |

---

## 11. Appendix & Glossary

*   **Privacy Matrix:** The per-Persona toggle system controlling which Base Profile attributes are disclosed.
*   **Feed Wall:** The Reading Room's main content surface — a gravity-ranked, LLM-curated scrolling feed.
*   **The Shelf:** The user's private library for bookmarks, interest tags, and purchased media.
*   **Gravity Algorithm:** The feed ranking formula — `Priority / (Time + 2)^1.8` — ensuring freshness without engagement dependency.
*   **Dwell Time:** The duration a user actively reads a piece of content. A private metric available only to partners.
*   **Completion Rate:** The percentage of a content item consumed. A private metric available only to partners.
*   **Web Dashboard:** The unified Next.js web portal — role-based access for Partner Dashboard (B2B analytics, Stage Studio, financials) and Admin Dashboard (internal platform ops, moderation, pipeline health).
*   **WRC:** Weekly Resonant Connections — the North Star Metric.
*   **Interest Flag:** Explicit opt-in signal of interest in a sponsor's offering. No PII is included.
*   **Consultation Circle:** Private scheduled Live Circle between a user and a sponsor. Replaces cold contact entirely.

---

## 12. MVP Scope Definition (Phase 1 Release)

> [!IMPORTANT]
> The Orbit feature (Ambient Lobby, Collision Engine, Open Notes, Handshakes, Tables, Blooms) is **not included in the MVP release**. The MVP focuses exclusively on building an addictive reading experience, validating knowledge commerce, and establishing the creator/partner ecosystem. Social mechanics will be introduced in a subsequent phase once the content engine is proven.

> [!NOTE]
> For full feature specifications and technical details, refer to the corresponding sections in this PRD. This section serves only as an inclusion/exclusion reference for the MVP release.

### Included in MVP

| Feature | PRD Reference | MVP Scope Summary |
| :--- | :--- | :--- |
| **The Feed Wall** | §4 Phase 1 | LLM-summarised content feed with Gravity Algorithm ranking. Full ingestion pipeline (BullMQ/Redis CRON workers). Zero vanity metrics. Contextual sponsored cards. |
| **The Shelf** | §4 The Shelf | Bookmarking, interest tag management, purchased media library. Native e-commerce for physical books (Stripe + dropshipping + delivery tracking) and digital books (embedded reader). |
| **The Stage** | §4 Phase 6 | LiveKit-powered broadcasting. Event scheduling, discovery via Feed Wall, audience Q&A, replays. Free and ticketed events via Stripe. |
| **Web Dashboard** | §4 Web Dashboard | Unified Next.js app — role-based. Partner view: Stage Studio, deep attention analytics (content, Stage, commerce), financials. Admin view: global platform analytics (WART, retention), financial health, content pipeline monitoring, moderation tools. |
| **Identity System** | §3 Identity Architecture | Base Profile + Personas, Privacy Matrix, interest tags. Single Persona required at minimum. |
| **Onboarding** | §5 Flow 1 | Google/Apple/Phone auth. Base Profile setup, Persona creation, direct entry to Feed Wall. |

### Excluded from MVP (Post-MVP Phases)

| Feature | PRD Reference | Reason for Deferral |
| :--- | :--- | :--- |
| **Ambient Lobby / Sandbox** | §4 Phase 2 | Social layer — requires proven content engagement first |
| **Open Notes & Handshakes** | §4 Phase 3 | Depends on Lobby infrastructure |
| **Tables (Audio WebRTC)** | §4 Phase 4 | Depends on Handshake flow |
| **Bloom & Roots (Live Circle)** | §4 Phase 5 | Depends on Table mechanics |
| **Collision Engine** | §4 Phase 2 | Core Orbit mechanic — post-MVP |
| **Sponsored Connections Flow** | §5 Flow 2 | Requires Live Circle infrastructure |
| **Circles Pro Subscription** | §7 | Monetisation phase — post-MVP |
| **Circles for Teams (B2B SaaS)** | §7 | Expansion phase — post-MVP |
| **ML-Powered Feed Ranking** | §6 Technical Constraints | Gravity Algorithm serves MVP; ML is a future investment |
