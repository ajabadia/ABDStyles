'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Building2, ChevronDown, Search, X, Check, Loader2 } from "lucide-react";
import { cn } from "./utils.js";
const defaultTranslations = {
    title: "ORGANIZACIÓN",
    searchPlaceholder: "Buscar organización...",
    noTenantsFound: "No se encontraron organizaciones",
    activeTenantBadge: "ORGANIZACIÓN ACTIVA",
    selectTenant: "Seleccionar organización",
};
export function TenantSelector({ activeTenantId, tenants = [], onTenantChange, userRole = "USER", translations, isLoading = false, }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const t = { ...defaultTranslations, ...translations };
    // Detect if user has privilege to switch context
    const isSuperAdmin = userRole === "SUPER_ADMIN";
    const isInteractive = isSuperAdmin || tenants.length > 1;
    // Resolve active tenant object
    const activeTenant = tenants.find((ten) => ten.tenantId === activeTenantId) || {
        tenantId: activeTenantId,
        name: activeTenantId,
    };
    // Filter tenants based on search input
    const filteredTenants = tenants.filter((ten) => ten.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ten.tenantId.toLowerCase().includes(searchQuery.toLowerCase()));
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // Reset search query when dropdown closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("");
        }
    }, [isOpen]);
    if (!mounted) {
        return (_jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border border-border bg-background/50 text-[10px] font-bold text-muted-foreground", children: [_jsx(Building2, { size: 14, className: "animate-pulse" }), _jsx("span", { className: "truncate max-w-[120px] uppercase tracking-wider", children: activeTenant.name })] }));
    }
    // Render non-interactive badge for standard users/admins with single tenant
    if (!isInteractive) {
        return (_jsxs("div", { title: t.activeTenantBadge, className: "flex items-center gap-2 px-3 py-2.5 border border-border/80 bg-background/40 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80 font-sans backdrop-blur-md select-none", children: [_jsx(Building2, { size: 13, className: "text-muted-foreground/60 shrink-0" }), _jsx("span", { className: "truncate max-w-[140px]", children: activeTenant.name })] }));
    }
    return (_jsxs("div", { className: "relative inline-block text-left", ref: containerRef, children: [_jsxs("button", { type: "button", "aria-haspopup": "listbox", "aria-expanded": isOpen, onClick: () => setIsOpen(!isOpen), className: cn("flex items-center justify-between gap-3 px-3 py-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted text-foreground transition-all duration-200 cursor-pointer shadow-lg text-[10px] font-black uppercase tracking-[0.15em] font-sans min-w-[160px] max-w-[240px]", isOpen && "bg-muted ring-1 ring-primary/20 border-primary/30 text-primary"), children: [_jsxs("div", { className: "flex items-center gap-2 truncate", children: [isLoading ? (_jsx(Loader2, { size: 13, className: "animate-spin text-primary shrink-0" })) : (_jsx(Building2, { size: 13, className: cn("shrink-0 transition-colors", isOpen ? "text-primary" : "text-muted-foreground") })), _jsx("span", { className: "truncate text-left", children: activeTenant.name })] }), _jsx(ChevronDown, { size: 13, className: cn("text-muted-foreground shrink-0 transition-transform duration-300", isOpen && "rotate-180 text-primary") })] }), isOpen && (_jsxs("div", { className: "absolute right-0 mt-3 w-72 bg-background/95 border border-border backdrop-blur-md z-[100] overflow-hidden rounded-none shadow-2xl p-3 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out", role: "listbox", "aria-label": t.selectTenant, children: [_jsxs("div", { className: "flex items-center justify-between mb-3 pb-1.5 border-b border-border", children: [_jsxs("span", { className: "text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground italic flex items-center gap-1.5", children: [_jsx(Building2, { size: 10, className: "text-primary" }), t.title] }), _jsx("button", { type: "button", "aria-label": "Cerrar selector", onClick: () => setIsOpen(false), className: "p-1 hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground cursor-pointer", children: _jsx(X, { size: 12 }) })] }), _jsxs("div", { className: "relative mb-2 flex items-center", children: [_jsx(Search, { size: 12, className: "absolute left-2.5 text-muted-foreground" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: t.searchPlaceholder, className: "w-full bg-card/60 hover:bg-card focus:bg-card border border-border hover:border-border/80 focus:border-primary/40 focus:ring-0 text-[10px] pl-8 pr-2 py-1.5 rounded-none text-foreground placeholder-muted-foreground font-sans focus:outline-none transition-colors", autoFocus: true })] }), _jsx("div", { className: "max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar", children: isLoading ? (_jsxs("div", { className: "flex items-center justify-center py-6 text-[10px] text-muted-foreground font-sans gap-2", children: [_jsx(Loader2, { size: 12, className: "animate-spin text-primary" }), "Cargando organizaciones..."] })) : filteredTenants.length === 0 ? (_jsx("div", { className: "text-center py-4 text-[10px] text-muted-foreground font-sans uppercase tracking-wider", children: t.noTenantsFound })) : (filteredTenants.map((ten) => {
                            const isSelected = ten.tenantId === activeTenantId;
                            return (_jsxs("button", { type: "button", role: "option", "aria-selected": isSelected, onClick: () => {
                                    if (onTenantChange && !isSelected) {
                                        onTenantChange(ten.tenantId);
                                    }
                                    setIsOpen(false);
                                }, className: cn("w-full text-left px-2.5 py-2 text-[10px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none", isSelected
                                    ? "bg-primary/10 border-primary/20 text-primary font-bold"
                                    : "bg-card/30 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"), children: [_jsxs("div", { className: "flex flex-col truncate pr-2", children: [_jsx("span", { className: "font-bold truncate", children: ten.name }), _jsxs("span", { className: "text-[8px] opacity-60 font-mono lowercase tracking-normal", children: ["@", ten.tenantId] })] }), isSelected && _jsx(Check, { size: 12, className: "text-primary shrink-0 ml-2" })] }, ten.tenantId));
                        })) })] }))] }));
}
//# sourceMappingURL=TenantSelector.js.map