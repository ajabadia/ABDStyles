import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
/**
 * 🛰️ HeroHeader
 * Standardized large header component for the public landing pages across the ABD Suite.
 */
export function HeroHeader({ statusText, title, description, className = "", titleClassName = "text-6xl md:text-8xl", }) {
    return (_jsxs("header", { className: `flex flex-col gap-6 items-center text-center ${className}`, role: "banner", children: [statusText && (_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-border text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono rounded", children: [_jsxs("span", { className: "relative flex h-2 w-2", "aria-hidden": "true", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })] }), statusText] })), _jsx("h1", { className: `${titleClassName} font-black tracking-tighter text-foreground italic uppercase antialiased leading-none`, children: title }), description && (_jsx("p", { className: "text-lg text-muted-foreground max-w-[650px] font-light leading-relaxed mx-auto", children: description }))] }));
}
//# sourceMappingURL=HeroHeader.js.map