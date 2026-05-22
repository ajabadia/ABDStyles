import React from 'react';
export interface UserIdentityProps {
    name: string;
    email: string;
    isAdmin?: boolean;
    adminHref?: string;
    logoutHref?: string;
    translations?: {
        adminTitle?: string;
        logoutTitle?: string;
    };
    LinkComponent?: React.ComponentType<any>;
}
/**
 * 👤 UserIdentity
 * Presentation component for rendering user profile status and session controls.
 * Keep it pure, stateless, and style-compliant.
 */
export declare function UserIdentity({ name, email, isAdmin, adminHref, logoutHref, translations, LinkComponent }: UserIdentityProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=UserIdentity.d.ts.map