import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ShieldCheck, Settings, LogOut } from 'lucide-react';
/**
 * 👤 UserIdentity
 * Presentation component for rendering user profile status and session controls.
 * Keep it pure, stateless, and style-compliant.
 */
export function UserIdentity({ name, email, isAdmin = false, adminHref = '/admin', logoutHref = '/api/auth/logout', translations, LinkComponent }) {
    const adminTitle = translations?.adminTitle || 'Admin Console';
    const logoutTitle = translations?.logoutTitle || 'Logout';
    // Fallback to native 'a' if LinkComponent is not supplied
    const Link = LinkComponent || 'a';
    return (_jsxs("div", { className: "flex items-center gap-4 p-1 pl-4 bg-card border border-border rounded-md backdrop-blur-sm group transition-all hover:border-primary/20", children: [_jsxs("div", { className: "flex flex-col items-end gap-0.5 py-1", children: [_jsx("span", { className: "text-[10px] font-mono uppercase tracking-[0.2em] text-foreground font-bold", children: name }), _jsxs("div", { className: "flex items-center gap-1.5", children: [isAdmin && _jsx(ShieldCheck, { className: "w-3 h-3 text-primary/60" }), _jsx("span", { className: "text-[9px] font-mono uppercase tracking-[0.1em] text-muted-foreground/60", children: email })] })] }), _jsx("div", { className: "h-8 w-[1px] bg-border mx-1" }), _jsxs("div", { className: "flex items-center", children: [isAdmin && (_jsx(Link, { href: adminHref, className: "p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors border-r border-border", title: adminTitle, children: _jsx(Settings, { className: "w-4 h-4" }) })), _jsx(Link, { href: logoutHref, className: "p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors", title: logoutTitle, children: _jsx(LogOut, { className: "w-4 h-4" }) })] })] }));
}
//# sourceMappingURL=UserIdentity.js.map