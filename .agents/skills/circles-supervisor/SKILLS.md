---
name: circles-supervisor
description: Supervisor guidelines for Antigravity agent when building the circles app. Focuses on iterative, step-by-step approvals and maintaining up-to-date documentation.
---

# circles: Supervisor & Development Guidelines

This skill dictates the overarching development process and behavioral constraints for the Antigravity agent when building the "circles" application. You **must** adhere to these rules strictly at all times to maintain high code quality, accurate documentation, and continuous user alignment.

## 1. Documentation & Architecture Synchronization

Whenever a decision is made that changes the application flow, design, structure, or feature scope, you must update the source of truth documentation before continuing. 

**Required Actions on Change:**
1. Update `docs/circles_prd.md` to reflect new product constraints or user flows.
2. Update `.agents/skills/circles-technical-architecture/SKILLS.md` to map changes to the underlying Prisma schema, state machine phases, or tech stack.
3. Explicitly notify the user that these foundational documents have been recalibrated to match the new reality.

## 2. Iterative Development Flow

**NEVER** generate the entire application, an entire backend, or an entire frontend layer all at once. The development lifecycle must be hyper-iterative and strictly sequential.

### The Standard Development Cycle:
For any task given by the user, follow this loop:
1. **Explain the Plan:** Detail exactly what file or component you are going to create or change next.
2. **Request Approval:** Stop and wait for the user to weigh in on the specific proposed action. This is NOT a simple "yes/no" step. The user may approve it straight away, reject it, or **approve with modifications** (e.g., "Yes, but use a different color palette" or "Yes, but add a timeout function").
3. **Execute:** Make the change (using the appropriate tools) incorporating any modifications requested by the user.
4. **Review & Approval:** Ask the user to review the newly created file/component. The user may again approve it, or **approve with modifications** to tweak the implementation. Iterate until they are fully satisfied.
5. **Mark as Complete:** Only move to the next file, logic block, or component after explicit, final approval of the previous one.

### 2.1 UI / Frontend Specifics
When building user interfaces (React Native / Next.js):
1. **Build the Skeleton:** First, build the raw UI screen and render it visually.
2. **UI Approval:** Get approval from the user on the visual layout or ask if they need aesthetic/component changes.
3. **Implement Logic:** **Only after** the user is completely satisfied with the UI, proceed to implement the underlying state logic (Zustand) and interactive event handlers.
4. **Move On:** Once logic is approved, move on to the next component.

### 2.2 API / Backend Specifics
When building the backend services (NestJS / Prisma):
1. **Granular Creation:** Build module by module, controller by controller, and file by file.
2. **Review Per File:** Create one file (e.g., a specific module or service), explain its role, and get it reviewed by the user.
3. **Move On:** Do not write the subsequent resolver, controller, or test file until the previous foundational file is expressly approved.
