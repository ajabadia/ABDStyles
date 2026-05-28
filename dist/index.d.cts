import { z } from 'zod';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ElementType, ReactNode } from 'react';

/**
 * ABDStyles - Industrial Styling Color Utilities
 *
 * Safe, mathematical color processing algorithms including YIQ accessibility contrast,
 * bitwise luminance shifting for dark-mode adaptation, and standard Hex-to-HSL conversions.
 */
/**
 * Calculates whether black (#000000) or white (#ffffff) provides higher visual contrast
 * on a given background color using the standard YIQ accessibility formula.
 *
 * @param hexcolor - Hex color string (e.g. "#ef4444")
 * @returns "#000000" or "#ffffff"
 */
declare function getContrastColor(hexcolor: string): string;
/**
 * Dynamically shifts the luminance of a hex color by a specified percentage.
 * Positive percent values lighten the color, negative values darken it.
 * Utilizes high-precision bitwise hexadecimal arithmetic.
 *
 * @param hex - Hex color string (e.g. "#3b82f6")
 * @param percent - Value between -100 and 100
 * @returns Shifted hex color string (e.g. "#4d90f7")
 */
declare function adjustColor(hex: string, percent: number): string;
/**
 * Converts a standard hexadecimal color string into HSL component strings
 * compatible with Tailwind CSS v4 variables (space-separated, e.g. "217 91.2% 59.8%").
 * This format allows Tailwind to dynamically apply opacity modifiers (e.g., bg-primary/50).
 *
 * @param hex - Hex color string (e.g. "#3b82f6")
 * @returns Space-separated HSL components
 */
declare function hexToHslComponents(hex: string): string;

/**
 * Zod validation schema for individual color hex codes.
 * Ensures the color is a valid 6-character hex code starting with a hash.
 * This is crucial for preventing CSS injection in custom style tags.
 */
declare const hexColorSchema: z.ZodString;
/**
 * Zod validation schema for theme configurations.
 */
declare const themeSchema: z.ZodObject<{
    primary: z.ZodString;
    secondary: z.ZodOptional<z.ZodString>;
    accent: z.ZodOptional<z.ZodString>;
    background: z.ZodOptional<z.ZodString>;
    rounded: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    radius: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Zod validation schema for complete tenant branding models.
 */
declare const brandingSchema: z.ZodObject<{
    logoUrl: z.ZodUnion<[z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>, z.ZodNull]>;
    theme: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodOptional<z.ZodString>;
        accent: z.ZodOptional<z.ZodString>;
        background: z.ZodOptional<z.ZodString>;
        rounded: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        radius: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
type TenantThemeConfig = z.infer<typeof themeSchema>;
type TenantBrandingConfig = z.infer<typeof brandingSchema>;

/**
 * Generates an optimized, highly robust CSS injection block to customize
 * Tailwind CSS v4 and standard CSS custom properties.
 *
 * Safely parses the inputs, checks for accessibility contrasts (YIQ),
 * shifts colors for dark-mode harmony, and configures borders.
 *
 * @param config - Theme configuration to render
 * @returns A safe, raw CSS string block to be injected directly in layout heads.
 */
declare function generateTenantCss(config: unknown): string;

/**
 * 🌓 ThemeScript: Centralized client-side theme initialization
 * Safely loads the user's preferred theme from localStorage prior to full rendering,
 * preventing flash of unstyled content (FOUC).
 */
declare function ThemeScript(): react_jsx_runtime.JSX.Element;

interface AdminPageHeaderProps {
    /** The icon to display in the breadcrumb / tag area */
    icon?: ElementType;
    /** The small tracking text above the title (e.g. "CONSOLA DE CONTROL • DASHBOARD") */
    breadcrumb?: ReactNode;
    /** The main title of the page */
    title: ReactNode;
    /** Optional back button or left-side action next to the title */
    backButton?: ReactNode;
    /** The descriptive subtitle under the main title */
    description?: ReactNode;
    /** Content to display on the right side of the header (actions, buttons, etc.) */
    children?: ReactNode;
    /** Custom className for the root container */
    className?: string;
    /** Optional tenant identifier to show current context */
    tenantId?: string;
}
/**
 * 🛰️ AdminPageHeader
 * Standardized header component for the administrative dashboards across the ABD Suite.
 */
declare function AdminPageHeader({ icon: Icon, breadcrumb, title, backButton, description, children, className, tenantId, }: AdminPageHeaderProps): react_jsx_runtime.JSX.Element;

interface HeroHeaderProps {
    /** The small tracking text in the pill above the title (e.g. "SYSTEM ACTIVE") */
    statusText?: ReactNode;
    /** The main title of the page, rendered gigantically */
    title: ReactNode;
    /** The descriptive subtitle under the main title */
    description?: ReactNode;
    /** Custom className for the root container */
    className?: string;
    /** Custom className for the title text, to allow size overrides */
    titleClassName?: string;
}
/**
 * 🛰️ HeroHeader
 * Standardized large header component for the public landing pages across the ABD Suite.
 */
declare function HeroHeader({ statusText, title, description, className, titleClassName, }: HeroHeaderProps): react_jsx_runtime.JSX.Element;

type RoleType = 'CREATOR' | 'RECIPIENT' | 'AUDITOR';
interface RoleLiteralsMap {
    CREATOR: {
        es: string;
        en: string;
    };
    RECIPIENT: {
        es: string;
        en: string;
    };
    AUDITOR: {
        es: string;
        en: string;
    };
}
type RoleBadgeVariant = 'default' | 'outline' | 'ghost';
interface RoleBadgeProps {
    /** The internal role type */
    role: RoleType;
    /** Optional tenant-specific role literals (from roleCustomization.roleLiterals) */
    roleLiterals?: RoleLiteralsMap;
    /** Locale to render the literal in (default: 'es') */
    locale?: 'es' | 'en';
    /** Visual variant (default: 'default') */
    variant?: RoleBadgeVariant;
    /** Whether to show a role icon (default: true) */
    showIcon?: boolean;
    /** Optional custom icon override */
    icon?: ElementType;
    /** Additional CSS classes */
    className?: string;
}
/**
 * 🏷️ RoleBadge
 *
 * Renders a contextual role badge that displays the tenant-customizable literal
 * for a given internal role (CREATOR / RECIPIENT / AUDITOR).
 *
 * When `roleLiterals` is provided (from the tenant's `roleCustomization` config),
 * the badge displays the tenant-specific name for the role in the given locale.
 * Otherwise, it falls back to default literals (Creador / Destinatario / Auditor).
 *
 * @example
 * ```tsx
 * // Basic usage with defaults
 * <RoleBadge role="CREATOR" />
 *
 * // With tenant customization
 * <RoleBadge
 *   role="RECIPIENT"
 *   roleLiterals={tenant.roleCustomization?.roleLiterals}
 *   locale="en"
 *   variant="outline"
 * />
 * ```
 */
declare function RoleBadge({ role, roleLiterals, locale, variant, showIcon, icon: CustomIcon, className, }: RoleBadgeProps): react_jsx_runtime.JSX.Element;

export { AdminPageHeader, type AdminPageHeaderProps, HeroHeader, type HeroHeaderProps, RoleBadge, type RoleBadgeProps, type RoleBadgeVariant, type RoleLiteralsMap, type RoleType, type TenantBrandingConfig, type TenantThemeConfig, ThemeScript, adjustColor, brandingSchema, generateTenantCss, getContrastColor, hexColorSchema, hexToHslComponents, themeSchema };
