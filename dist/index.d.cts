import { z } from 'zod';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
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
}, "strip", z.ZodTypeAny, {
    primary: string;
    rounded: boolean;
    secondary?: string | undefined;
    accent?: string | undefined;
    background?: string | undefined;
    radius?: string | undefined;
}, {
    primary: string;
    secondary?: string | undefined;
    accent?: string | undefined;
    background?: string | undefined;
    rounded?: boolean | undefined;
    radius?: string | undefined;
}>;
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
    }, "strip", z.ZodTypeAny, {
        primary: string;
        rounded: boolean;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        radius?: string | undefined;
    }, {
        primary: string;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        rounded?: boolean | undefined;
        radius?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    theme: {
        primary: string;
        rounded: boolean;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        radius?: string | undefined;
    };
    logoUrl?: string | null | undefined;
}, {
    theme: {
        primary: string;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        rounded?: boolean | undefined;
        radius?: string | undefined;
    };
    logoUrl?: string | null | undefined;
}>;
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

interface NavUser {
    name: string;
    role: string;
    tenantId: string;
    email?: string;
}
interface SidebarLink {
    href: string;
    label: string;
    icon: React.ReactNode;
}
interface LinkComponentProps {
    href: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}
interface TacticalSidebarTranslations {
    brandFallback?: string;
    logoutBtn?: string;
    identityProvider?: string;
    statusOnline?: string;
    emailLabel?: string;
}
interface TacticalSidebarProps {
    user: NavUser;
    links: SidebarLink[];
    logoUrl?: string | null;
    onLogout: () => void;
    brandName?: string;
    /** Component to use for navigation links (e.g. next/link). Falls back to <a>. */
    LinkComponent?: React.ComponentType<LinkComponentProps>;
    translations?: TacticalSidebarTranslations;
    /** Currently active path — used to highlight the active link. */
    activeHref?: string;
    /** URL for the logo/brand link at the top of the sidebar. Defaults to "/dashboard". */
    homeHref?: string;
    /** Aria-label for the hamburger toggle button. */
    menuAriaLabel?: string;
}
declare function TacticalSidebar({ user, links, logoUrl, onLogout, brandName, LinkComponent, translations, activeHref, homeHref, menuAriaLabel, }: TacticalSidebarProps): react_jsx_runtime.JSX.Element;

/**
 * 🌓 ThemeScript: Centralized client-side theme initialization
 * Safely loads the user's preferred theme from localStorage prior to full rendering,
 * preventing flash of unstyled content (FOUC).
 */
declare function ThemeScript(): react_jsx_runtime.JSX.Element;

interface FooterProps {
    className?: string;
    label?: string;
    telemetryItems?: Array<{
        label: string;
        value: string;
    }>;
    showSeparator?: boolean;
    separatorWidth?: 'full' | 'short';
    opacity?: number;
}
/**
 * 🏁 Footer
 * Centralized, style-compliant Tech-Noir footer component.
 * Ensures consistent monospace typeface, case, spacing, and tracking.
 */
declare function Footer({ className, label, telemetryItems, showSeparator, separatorWidth, opacity }: FooterProps): react_jsx_runtime.JSX.Element;

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

export { AdminPageHeader, type AdminPageHeaderProps, Footer, type FooterProps, HeroHeader, type HeroHeaderProps, type LinkComponentProps, type NavUser, type SidebarLink, TacticalSidebar, type TacticalSidebarProps, type TacticalSidebarTranslations, type TenantBrandingConfig, type TenantThemeConfig, ThemeScript, adjustColor, brandingSchema, generateTenantCss, getContrastColor, hexColorSchema, hexToHslComponents, themeSchema };
