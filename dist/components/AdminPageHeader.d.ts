import type { ElementType, ReactNode } from "react";
export interface AdminPageHeaderProps {
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
}
/**
 * 🛰️ AdminPageHeader
 * Standardized header component for the administrative dashboards across the ABD Suite.
 */
export declare function AdminPageHeader({ icon: Icon, breadcrumb, title, backButton, description, children, className, }: AdminPageHeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AdminPageHeader.d.ts.map