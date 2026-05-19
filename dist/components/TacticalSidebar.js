import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { Menu, X, Shield, LogOut } from "lucide-react";
import { cn } from "./utils.js";
const defaultTranslations = {
    brandFallback: "ABD SYSTEM",
    logoutBtn: "TERMINAR SESIÓN",
    identityProvider: "IDENTITY PROVIDER",
    statusOnline: "ONLINE",
    emailLabel: "EMAIL",
};
export function TacticalSidebar({ user, links, logoUrl, onLogout, brandName, LinkComponent, translations, activeHref, }) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);
    const t = { ...defaultTranslations, ...translations };
    const Link = LinkComponent || (({ href, children, ...props }) => (_jsx("a", { href: href, ...props, children: children })));
    return (_jsxs(_Fragment, { children: [_jsx("button", { "aria-label": "Toggle Tactical Menu", onClick: () => setIsOpen(!isOpen), className: cn("fixed top-6 left-6 p-3 rounded-none bg-background/80 backdrop-blur-md shadow-lg border border-border hover:border-primary/40 hover:bg-muted transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-1 focus:ring-primary/40", isOpen ? "z-[55]" : "z-40"), children: isOpen ? (_jsx(X, { className: "w-5 h-5 text-primary" })) : (_jsx(Menu, { className: "w-5 h-5 text-foreground" })) }), isOpen && (_jsx("div", { onClick: () => setIsOpen(false), className: "fixed inset-0 z-[45] bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" })), _jsxs("aside", { className: cn("fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out transform rounded-none", isOpen ? "translate-x-0" : "-translate-x-full"), children: [_jsxs("div", { className: "flex justify-between items-center mb-8 pt-12 border-b border-border pb-4", children: [_jsxs(Link, { href: "/dashboard", onClick: () => setIsOpen(false), className: "flex items-center gap-3", children: [logoUrl ? (_jsx("img", { src: logoUrl, alt: "Logo", className: "w-6 h-6 object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" })) : (_jsx("div", { className: "w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center", children: _jsx(Shield, { size: 12, className: "text-primary" }) })), _jsx("span", { className: "font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground", children: user.tenantId || brandName || t.brandFallback })] }), _jsx("button", { "aria-label": "Close", onClick: () => setIsOpen(false), className: "p-1.5 hover:bg-muted border border-border rounded-none text-muted-foreground hover:text-foreground transition-colors cursor-pointer", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("nav", { className: "flex-1 flex flex-col gap-2 overflow-y-auto", children: links.map((link) => {
                            const isActive = activeHref ? (activeHref === link.href ||
                                (link.href !== "/dashboard" && activeHref.startsWith(link.href))) : false;
                            return (_jsxs(Link, { href: link.href, onClick: () => setIsOpen(false), className: cn("px-4 py-3 rounded-none flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border", isActive
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-muted/10 border-border text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-primary"), children: [_jsx("span", { className: "shrink-0", children: link.icon }), _jsx("span", { className: "flex-1 truncate", children: link.label })] }, link.href));
                        }) }), _jsx("div", { className: "border-t border-border pt-6 mt-auto", children: _jsxs("div", { className: "flex flex-col gap-4 p-4 border border-border bg-muted/10 rounded-none relative overflow-hidden", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary rounded-none", children: user.name?.charAt(0).toUpperCase() || "U" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs font-black tracking-wider truncate uppercase text-foreground", children: user.name }), _jsx("p", { className: "font-mono text-[8px] text-muted-foreground/80 uppercase tracking-widest truncate", children: user.role })] })] }), _jsxs("div", { className: "font-mono text-[8px] text-muted-foreground/60 flex flex-col gap-1 border-t border-border/50 pt-2.5", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: [t.identityProvider, ":"] }), _jsx("span", { className: "text-primary font-bold", children: t.statusOnline })] }), user.email && (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: [t.emailLabel, ":"] }), _jsx("span", { className: "truncate max-w-[150px]", children: user.email.toLowerCase() })] }))] }), _jsxs("button", { "aria-label": "Logout", onClick: onLogout, className: "w-full flex items-center justify-center gap-2 px-3 py-2 border border-border text-[9px] font-mono font-black uppercase tracking-widest transition-all rounded-none hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 cursor-pointer", children: [_jsx(LogOut, { size: 12 }), _jsx("span", { children: t.logoutBtn })] })] }) })] })] }));
}
//# sourceMappingURL=TacticalSidebar.js.map