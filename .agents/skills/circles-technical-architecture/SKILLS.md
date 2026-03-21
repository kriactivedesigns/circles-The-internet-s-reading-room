# circles: Technical Architecture & System Design

| Metadata | Value |
|---|---|
| **Objective** | Provide technical guidelines for circles — "The internet's reading room" |
| **Stage** | Pre-Seed / Phase 0 & 1 |
| **Core Paradigm** | Hybrid Async/Sync Social Network (Anti-vanity, Contextual Identities) |
| **Updated** | Version 4.0 |

---

## 1. System Overview

**circles** replaces algorithmic outrage with deep content consumption (Reading Room / Feed Orbit) and serendipitous, organic human connection. The platform uses an ambient collision engine that converts passive readers into active conversation participants through a sequence of explicitly consented, transient states.

### Core Stack
*   **Backend Framework:** NestJS (Node.js) or Python (Celery) workers for content ingestion
*   **Identity & Auth:** Supabase Auth + Row-Level Security (RLS)
*   **Database:** PostgreSQL (with Prisma ORM)
*   **Real-time State & Pub/Sub:** Redis (Collision/Presence) + Supabase Realtime (Notes/Lobby)
*   **Real-time Communication:** LiveKit (WebRTC for Video/Audio in Live Circles & Stages)
*   **Payments:** Stripe Connect (Tickets, Consultation Circles)
*   **Frontend Apps:** React Native (Expo) primarily for mobile, Next.js for web endpoints.
*   **State Management:** Zustand

---

## 2. Identity Architecture (Prisma Schema Design)

### 2.1. Dual-Identity System

The database enforces a strict separation between the legal identity and the contextual identity.

```prisma
model User {
  id               String          @id @default(uuid())
  email            String?         @unique
  phone            String?         @unique
  authProvider     String          // e.g., 'google', 'apple', 'phone'
  name             String?         // Full name, private by default
  birthDate        DateTime        // Mandatory for age-appropriate grouping/matching
  gender           String          // Mandatory selected gender identity
  location         String          // Mandatory location context
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt
  
  // Relations
  personas         CirclePersona[] // Contextual facets of the user
  spaceLeases      SpaceLease[]    // For planted roots
}

model CirclePersona {
  id               String          @id @default(uuid())
  userId           String
  alias            String          // The pseudonym for this persona
  avatarUrl        String?
  interestTags     String[]        // Base interests: e.g., ["UX Design", "SaaS Scaling"]
  privacyMatrix    Json            // Configures which Base Profile fields are exposed
  isActive         Boolean         @default(false)
  
  // Relations
  user             User            @relation(fields: [userId], references: [id])
  handshakesSent   Handshake[]     @relation("SentHandshakes")
  handshakesRecv   Handshake[]     @relation("ReceivedHandshakes")
  sessions         SessionMember[]
  readingList      ReadingListItem[]
}

model FeedItem {
  id               String          @id @default(uuid())
  type             FeedItemType    // ARTICLE, NEWS, COMMUNITY, BOOK_FREE, BOOK_PAID, BOOK_PHYSICAL, SPONSORED_CARD, STAGE_EVENT
  title            String
  summary          String
  sourceUrl        String?
  imageUrl         String?
  tags             String[]        // For Persona interest matching
  publishedAt      DateTime        @default(now())
  priority         Int             @default(0)
  
  // For Book/Commerce Models
  isSponsored      Boolean         @default(false)
  sponsorId        String?         // References verified organization
}

enum FeedItemType {
  NEWS
  ARTICLE
  COMMUNITY
  BOOK_FREE
  BOOK_PAID
  BOOK_PHYSICAL
  SPONSORED_CARD
  STAGE_EVENT
}

model InterestFlag {
  id               String          @id @default(uuid())
  personaId        String
  sponsorId        String
  feedItemId       String
  availability     Json            // e.g. ["Weekday evenings", "Weekend mornings"]
  status           FlagStatus      @default(PENDING) // PENDING, SCHEDULED, REJECTED
  createdAt        DateTime        @default(now())
}

enum FlagStatus {
  PENDING
  SCHEDULED
  REJECTED
}
```

---

## 3. The State Machine & UX Architecture

The system transitions across **6 sequential phases**:

### Phase 1: The Reading Room (Feed Orbit & Book Shelf)
*   **The Orbit:** A single-player content feed curated for the active Persona's tags.
*   **Content Types:** Articles, RSS, Free eBooks (embedded reader), Paid eBooks (in-app margin), Physical Books (affiliate links), and Contextual Sponsored Cards (max 1/10).
*   **UX:** Ambient interaction. Zero vanity metrics (no likes, counters, or comments). 
*   **Orbit Cards:** Real-time presence detection triggers "Active Collision Cards" inside the Feed Orbit when a critical mass of similar personas is detected. 

### Phase 2: The Ambient Lobby (Sandbox)
*   **Trigger:** The user clicks an active Collision Card from the Orbit.
*   **UX:** Unstructured, floating visual layout. Personas drift like bubbles.
*   **Mechanic:** Presence is synced via **Redis**. The user remains in this Lobby sandbox, observing the floating other users.

### Phase 3: The Open Note & Handshake
*   **Drop a Note:** A floating user drops a contextual Open Note (max 150 chars). They inherit a visual indicator/bubble on their avatar.
*   **Read & Engage:** Clicking on the indicated user opens a bubble displaying their note and a "Handshake" button.
*   **The Request:** User A clicks Handshake on User B. User B receives a popup displaying User A's note and an Accept/Decline prompt.

### Phase 4: The Table (Micro-Channel in the Lobby)
*   **Trigger:** User B accepts the Handshake.
*   **UX:** A connected visual boundary (e.g., dashed concentric circle) forms around User A and User B **inside the Lobby itself**.
*   **Audio-First:** An isolated LiveKit WebRTC audio channel opens strictly between the Table participants.
*   **Visibility:** Other ambient personas inside the Lobby can still physically see that a Table (circle) has formed between A and B, maintaining the "teashop" setting.

### Phase 5: The Bloom & Roots (Live Circle)
*   **Trigger:** Any participant on the Table clicks the "Bloom" button. Unanimous consent is requested.
*   **UX Change:** On blooming, the participants are extracted from the floating Lobby entirely and transitioned to a dedicated new page: the **Live Circle** (or Bloomed Table).
*   **Features:** Video escalation (via consent), "Mute Audio", and the "Plant Root" action (to save the circle identity post-session).
*   **Database Implication:** `SessionStatus` moves from `TABLE` to `LIVE_CIRCLE`. 
*   **No-Trace Default:** The room and all conversation data evaporate on exit unless Roots are planted.

### Phase 6: The Stage
*   **Trigger:** Scheduled occurrences via `STAGE_EVENT` Orbit Cards.
*   **Mechanic:** Broadcaster (A/V enabled) + Listen-only Audience. Monetised via Stripe ticket sales (or free).

---

## 4. Subsystem Guidelines

### 4.1. Real-Time Collision (Redis & Supabase)
*   **Presence Tracking:** User connections to the Lobby join a Redis Set: `topic:presence:{topicName}`. Active TTL sweeps happen every 15–45s.
*   **Lobby Events (Supabase Realtime):** Notes, avatar position movements (floating), and Handshake triggers use Supabase Realtime to broadcast payloads efficiently.

### 4.2. LiveKit Orchestration
*   **Table Phase:** When a Handshake is confirmed, NestJS generates a unique LiveKit Room token limited strictly to those 2-N users.
*   **Bloom Phase:** WebRTC constraints are expanded (allowing optional video streams) and UI layouts are transitioned to the immersive Bloomed overlay.

### 4.3. Sponsored Connections (Consent-Based B2B)
1. **Feed Insertion:** `SPONSORED_CARD` appears. It must match ≥3 Persona Tags. 
2. **Interest Flag:** User clicks "I'm Interested", selecting their availability windows in a popup.
3. **Backend Anonymity:** Only the `Persona ID` and availability string are sent to the Sponsor. PII is scrubbed.
4. **Consultation Circle:** A private booked session is confirmed and opens natively as an audio-first Live Circle.

### 4.4. The Book Shelf
*   **Core Logic:** Physical book cards use affiliate URLs out directly. eBooks utilize an embedded React Native / Next.js viewer.
*   **Persistence:** The `ReadingList` relation bounds saved `FeedItem` IDs (books only) to the given `CirclePersona`. Free limits (20) vs Circles Pro limits (unlimited) are checked via a lightweight API route prior to persisting.

---

## 5. Security & Privacy Constraints
*   **No Audio/Video by Default:** All WebRTC handshakes default strictly to audio. Video requires explicit opt-in escalation inside the Live Circle boundary.
*   **Persona Isolation:** Handshakes, Lobbies, and Reading Lists operate solely via `personaId`. Application APIs must never accidentally leak `userId` across the boundary.
*   **RLS Policies:** Supabase Row-Level Security explicitly restricts access so a User can only fetch `CirclePersona` and related tokens tied strictly to their authenticated `auth.uid()`.

---

## 6. Project Directory Structure

```text
project/
├── backend/                  # NestJS API, Supabase integrations, Redis presence handlers
│   ├── src/
│   ├── prisma/               # Database definitions and migrations
│   └── test/
└── frontend-mobile/          # React Native (Expo) app for iOS & Android
    ├── src/
    │   ├── components/       # Custom-built UI components (No 3rd party UI libraries)
    │   ├── stores/           # Zustand state management slices
    │   └── screens/          # Feed Orbit, Lobby, Live Circle views
    ├── app.json
    └── package.json
```
