import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
/**
 * 🛰️ AdminPageHeader
 * Standardized header component for the administrative dashboards across the ABD Suite.
 */
export function AdminPageHeader({ icon: Icon, breadcrumb, title, backButton, description, children, className = "", }) {
    return (_jsxs("header", { className: `flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8 ${className}`, children: [_jsxs("div", { className: "flex flex-col gap-2 min-w-0 flex-1", children: [breadcrumb && (_jsxs("div", { className: "text-[10px] font-mono font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2 mb-2", children: [Icon && _jsx(Icon, { size: 14, className: "text-primary animate-pulse", "aria-hidden": "true" }), _jsx("span", { className: "animate-console-pulse", children: breadcrumb })] })), _jsxs("div", { className: "flex items-center gap-4 mt-1 min-w-0", children: [backButton, _jsx("h1", { className: "text-3xl font-black uppercase italic tracking-tight text-foreground leading-none flex-1 truncate", children: title })] }), description && (_jsx("div", { className: "text-sm text-muted-foreground font-sans mt-2 leading-relaxed", children: description }))] }), children && (_jsx("div", { className: "flex items-center space-x-2 shrink-0", children: children }))] }));
}
//# sourceMappingURL=AdminPageHeader.js.map