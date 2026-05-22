import type { ReactNode } from "react";
export interface HeroHeaderProps {
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
export declare function HeroHeader({ statusText, title, description, className, titleClassName, }: HeroHeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HeroHeader.d.ts.map