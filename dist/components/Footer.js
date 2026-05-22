import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
/**
 * 🏁 Footer
 * Centralized, style-compliant Tech-Noir footer component.
 * Ensures consistent monospace typeface, case, spacing, and tracking.
 */
export function Footer({ className = '', label, telemetryItems, showSeparator = true, separatorWidth = 'full', opacity = 'normal' }) {
    // Map opacity levels to class strings compatible with standard Tailwind setups
    const opacityClass = opacity === 'low' ? 'text-muted-foreground/20' :
        opacity === 'high' ? 'text-muted-foreground/40' :
            'text-muted-foreground/30';
    const separatorWidthClass = separatorWidth === 'short' ? 'w-24 mx-auto' : 'w-full';
    return (_jsxs("footer", { className: `mt-auto pt-12 flex flex-col items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] ${opacityClass} ${className}`, role: "contentinfo", children: [showSeparator && (_jsx("div", { className: `h-[1px] bg-border/40 ${separatorWidthClass}`, "aria-hidden": "true" })), telemetryItems && telemetryItems.length > 0 ? (_jsx("div", { className: "flex flex-wrap justify-center gap-x-12 gap-y-2", children: telemetryItems.map((item, index) => (_jsxs("span", { children: [item.label, ": ", item.value] }, index))) })) : (label && _jsx("span", { children: label }))] }));
}
//# sourceMappingURL=Footer.js.map