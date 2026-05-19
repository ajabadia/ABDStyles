# Product Roadmap — `@abd/styles`

Roadmap detailing the completed visual engineering achievements and the upcoming integration sprints for the unified styling system library.

---

## 🏆 Completed Sprints

### Sprint 1: Unified Library Foundations
- **Objective**: Establish the core library package and color math engine.
- **Results**:
  - Structured the package as a TypeScript ESM library.
  - Implemented HSL mappings, YIQ contrast, and dark-mode luminance arithmetic.
  - Hardened input validations using strict Zod schemas against CSS injection attacks.
  - Adapted a 4-phase quality audit pipeline yielding a flawless certification status.

### Sprint 2: Centralized Visual Chassis & UI Components
- **Objective**: Standardize visual layout styles and abstract critical UI components (`SystemSettings` and `TacticalSidebar`) to eliminate style drift across the suite.
- **Results**:
  - Implemented the unified `src/styles/industrial-core.css` with HSL definitions, console grid, grain texture, and scrollbars.
  - Created framework-agnostic pure React components `SystemSettings` and `TacticalSidebar`.
  - Added JSX support to the TSConfig, peer dependencies for React, and PowerShell CSS copying build script.
  - Updated the architectural audit guard to include `.tsx` file scanning and successfully certified the system.

---

## 🗺️ Upcoming Sprints

### Sprint 2: Satelite Integration (ABDQuiz & ABDAuth)
- **Objective**: Connect the first core platforms in the ecosystem to `@abd/styles`.
- **Tasks**:
  - [ ] Add the Git dependency reference in `ABDQuiz`'s `package.json`.
  - [ ] Refactor `ABDQuiz/src/app/[locale]/layout.tsx` to read the tenant session and call `generateTenantCss` server-side (SSR).
  - [ ] Add the Git dependency reference in `ABDAuth`'s `package.json` and refactor its root layout.
  - [ ] Test real-time visual mutations locally using subdomain simulation via `lvh.me:3300`.

### Sprint 3: Admin Customizer Interface (ABDAuth / ABDGovernance)
- **Objective**: Implement the live administrative personalization form.
- **Tasks**:
  - [ ] Create `TenantBrandingForm.tsx` with HSL color pickers and border-radius selector.
  - [ ] Implement secure Logo upload drag-and-drop linking to **Vercel Blob Storage** (`@vercel/blob`).
  - [ ] Build the Live Preview Box demonstrating visual style adjustments instantly.

### Sprint 4: Dynamic Vercel Edge API CSS Gateway (Optional)
- **Objective**: Serve computed CSS directly via an HTTP endpoint for static plain-HTML landing pages or legacy sub-systems.
- **Tasks**:
  - [ ] Implement `/api/theme/route.ts` inside `ABDStyles` querying tenant MongoDB configs.
  - [ ] Configure Vercel Edge CDN headers (`stale-while-revalidate`) for rapid 10ms stylesheet delivery.
