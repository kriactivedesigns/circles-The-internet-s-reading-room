# circles — The internet's reading room.

**Product Requirements Document & Roadmap**  
**Version:** 4.0 | **Date:** March 2026 | **Stage:** Pre-Seed / Ideation  
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

### Phase 1 — The Reading Room (Feed Wall / Orbit)
The anchor experience. A curated, single-player library ensuring zero cold-start friction.
*   **Content Mix:** RSS-pulled articles, global news APIs, study reports, native webinars, and curated book recommendations — all mapped to the active Persona's interest tags.
*   **Zero Vanity:** No public likes, no comment sections, no follower counts.
*   **Book Shelf:** Curated books are surfaced inline in the Feed Wall alongside articles. Users add titles to a personal Reading List. For physical books, an affiliate purchase link routes to retail partners. For paid eBooks, the user can purchase and read entirely within the app via an embedded reader. Free eBooks open directly in-app. 
*   **Contextual Sponsored Cards:** Domain-matched sponsored content (courses, certification programmes, workshops) appears as clearly-labelled cards in the Feed Wall — at most 1 per 10 items. Sponsored cards are never shown inside active Lobbies, Tables, or Live Circles.

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
*   **Mechanics:** Broadcaster (A/V enabled) + Audience (listen-only) model with a Stage Sandbox for Q&A notes.
*   **Replays:** Hosts record and publish Stages; replays appear in attendee feeds.

---

## 5. Detailed User Flows & Edge Cases

### Flow 1 — Onboarding & Identity Generation
1. **Auth:** Magic Link (email/phone) or OAuth (Google/Apple). No password required.
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
| **Payments** | Ticketed Stages, Sponsored Connections | Stripe Connect |

### MVP Technical Constraints & Decisions
*   **No ML in MVP:** Feed ranking is chronological + tag-match weighted. True personalisation is a Phase 2 investment.
*   **Audio-First Priority:** Video is gated behind explicit consent and deprioritised to reduce LiveKit cost and complexity.
*   **Mobile-First:** React Native (Expo) primarily. Next.js/PWA secondary for Guest drop-ink links.

---

## 7. Monetisation & Business Model

Revenue must reinforce, not erode, the core user experience. No intermediary data brokering.

| Stream | Model | Notes |
| :--- | :--- | :--- |
| **Circles Pro** | ₹499/mo or ₹3,999/yr | Unlimited Personas, advanced Privacy Matrix, Roots history, offline eBooks |
| **Stage Tickets** | 5–15% platform fee | Host sets price via Stripe |
| **Sponsored Connections** | CPM + 20% booking fee | Tag-matched sponsor cards. Booked sessions via Interest Flag |
| **eBook Sales**| 15–30% platform margin | Paid eBooks purchased and read in-app via embedded reader |
| **Physical Book Affiliate**| 4–8% commission | Amazon/Flipkart integration |
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
*   **Orbit / Feed Wall:** The Reading Room's main content surface.
*   **WRC:** Weekly Resonant Connections — the North Star Metric.
*   **Interest Flag:** Explicit opt-in signal of interest in a sponsor's offering. No PII is included.
*   **Consultation Circle:** Private scheduled Live Circle between a user and a sponsor. Replaces cold contact entirely.
