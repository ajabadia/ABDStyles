# Sanctuary of Lessons Learned — `@abd/styles`

This document stores the technical challenges, silent failures, and resolution strategies discovered during the development of the `@abd/styles` unified dynamic styling system.

---

## 🏛️ Victory 1: CommonJS Mismatch under strict `verbatimModuleSyntax`

### 1. The Symptom
During the first execution of `npm run build` (`tsc`), the compiler threw 12 syntax-related errors across all source files, including:
*   `src/engine/css-generator.ts:1:10 - error TS1295: ECMAScript imports and value declarations in a CommonJS module when 'verbatimModuleSyntax' is enabled.`
*   `src/utils/color-utils.ts:66:1 - error TS1287: A top-level 'export' modifier cannot be used in a CommonJS module.`

### 2. The Root Cause
Our TSConfig was strictly configured for modern environments:
```json
"compilerOptions": {
  "module": "NodeNext",
  "moduleResolution": "NodeNext",
  "verbatimModuleSyntax": true
}
```
However, in Node, if `"type": "module"` is **not** specified in the local `package.json`, the environment defaults to **CommonJS**. Under `NodeNext` resolution rules:
*   TypeScript treats `.ts` files as CommonJS targets if they are in a CommonJS package directory.
*   But when `"verbatimModuleSyntax": true` is active, the compiler enforces strict consistency. It forbids using standard ES module keywords (`import` and `export`) inside any file that compiles to CommonJS!
*   Therefore, the modern import/export statements in our source code were flagged as illegal, triggering compiler failures.

### 3. The Industrial Solution
We updated [package.json](file:///d:/desarrollos/ABDStyles/package.json) to explicitly include:
```json
"type": "module"
```
This single setting instructs both Node and TypeScript that this package consists entirely of modern ECMAScript Modules (ESM). The compiler immediately matched our ES import/export code with ESM compilation targets under `NodeNext` and compiled the whole library with **0 errors and 0 warnings**.

---

## 🧭 Architectural Rules of Thumb

1.  **Strict HSL String Component Formatting**: In Tailwind CSS v4, dynamic color variables (like `--primary`) must be provided as raw space-separated values (`H S% L%`) without standard `hsl()` wrapping. This is crucial to enable Tailwind to dynamically append opacity modifiers in compiled CSS (e.g., `bg-primary/50` translates to `hsl(H S L / 0.5)`).
2.  **SSR Dynamic Stylesheet Injection**: In Next.js App Router, dynamic styling should always be generated and injected **server-side** (`SSR`) directly into the HTML `<head>`. Doing this inside layout.tsx avoids any unstyled layout flashing (FOUC), which was the primary visual drawback of legacy client-side styling approaches (such as the fetch dynamic style loop).
