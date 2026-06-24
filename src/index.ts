/**
 * @purpose Proporciona funcionalidades y componentes para estilizar en una aplicación SaaS multi-tenant.
 * @purpose_en Exports utility functions and components for styling in a multi-tenant SaaS application.
 * @refactorable false
 * @classification Helper Utility
 * @complexity Low
 * @fingerprint exports:0,imports:0,sig:ou635j
 * @lastUpdated 2026-06-23T23:26:43.692Z
 */

/**
 * @ajabadia/styles - Central Industrial Styling Library
 * 
 * Unified module exports providing mathematical color utilities, strict input validations,
 * and high-fidelity runtime HSL style generation for multi-tenant SaaS integration.
 */

export * from './utils/color-utils.js';
export * from './validation/branding-schema.js';
export * from './engine/css-generator.js';
export * from './components/ThemeScript.js';
export * from './components/AdminPageHeader.js';
export * from './components/HeroHeader.js';
export * from './components/RoleBadge.js';
export * from './components/LabeledField.js';
