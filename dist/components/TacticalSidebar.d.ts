import * as React from "react";
export interface NavUser {
    name: string;
    role: string;
    tenantId: string;
    email?: string;
}
export interface SidebarLink {
    href: string;
    label: string;
    icon: React.ReactNode;
}
export interface LinkComponentProps {
    href: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}
export interface TacticalSidebarTranslations {
    brandFallback?: string;
    logoutBtn?: string;
    identityProvider?: string;
    statusOnline?: string;
    emailLabel?: string;
}
export interface TacticalSidebarProps {
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
export declare function TacticalSidebar({ user, links, logoUrl, onLogout, brandName, LinkComponent, translations, activeHref, homeHref, menuAriaLabel, }: TacticalSidebarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TacticalSidebar.d.ts.map