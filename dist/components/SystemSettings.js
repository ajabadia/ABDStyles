import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Settings, X, LogIn, LogOut, Sun, Moon, Monitor, Languages, Check } from "lucide-react";
import { cn } from "./utils.js";
const defaultTranslations = {
    title: "CONFIGURACIÓN DEL SISTEMA",
    close: "Cerrar",
    language: "IDIOMA",
    theme: "TEMA",
    themeLight: "CLARO",
    themeDark: "OSCURO",
    themeSystem: "SISTEMA",
    logout: "TERMINAR SESIÓN",
    login: "INICIAR SESIÓN",
};
export function SystemSettings({ locale, onLocaleChange, locales = ["es", "en"], theme, onThemeChange, translations, isAuthenticated = false, onLogin, onLogout, logoutUrl = "/api/auth/logout", versionSignature = "ABD_SYSTEM_V1.0", }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    // Local theme state if not controlled by parent
    const [internalTheme, setInternalTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "dark";
        }
        return "dark";
    });
    const activeTheme = theme !== undefined ? theme : internalTheme;
    const handleThemeChange = (newTheme) => {
        if (onThemeChange) {
            onThemeChange(newTheme);
        }
        else {
            setInternalTheme(newTheme);
            if (typeof window === "undefined")
                return;
            localStorage.setItem("theme", newTheme);
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            if (newTheme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                root.classList.add(systemTheme);
            }
            else {
                root.classList.add(newTheme);
            }
        }
    };
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
    const t = { ...defaultTranslations, ...translations };
    if (!mounted) {
        return (_jsx("button", { "aria-label": "Loading Settings", disabled: true, className: "p-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md opacity-60 cursor-not-allowed", children: _jsx(Settings, { size: 18, className: "text-muted-foreground animate-pulse" }) }));
    }
    return (_jsxs("div", { className: "relative inline-block text-left", ref: containerRef, children: [_jsx("button", { "aria-label": "Open Settings", onClick: () => setIsOpen(!isOpen), className: cn("p-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted transition-all active:scale-90 cursor-pointer shadow-lg", isOpen && "bg-muted ring-1 ring-primary/20 border-primary/30"), children: _jsx(Settings, { size: 18, className: cn("text-foreground transition-transform duration-500", isOpen && "rotate-90 text-primary") }) }), isOpen && (_jsxs("div", { className: "absolute right-0 mt-3 w-64 bg-background/95 border border-border backdrop-blur-md z-[100] overflow-hidden rounded-none shadow-2xl p-4 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out", role: "region", "aria-label": "System Settings Menu", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 pb-2 border-b border-border", children: [_jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic", children: t.title }), _jsx("button", { "aria-label": t.close, onClick: () => setIsOpen(false), className: "p-1 hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground cursor-pointer", children: _jsx(X, { size: 14 }) })] }), _jsxs("div", { className: "space-y-2 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest mb-3", children: [_jsx(Languages, { size: 12 }), t.language] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: locales.map((loc) => (_jsxs("button", { "aria-label": `${t.language}: ${loc.toUpperCase()}`, onClick: () => onLocaleChange(loc), className: cn("flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase transition-all duration-200 border cursor-pointer rounded-none", locale === loc
                                        ? "bg-primary/10 border-primary/30 text-primary"
                                        : "bg-card border-border hover:bg-muted text-muted-foreground"), children: [loc, locale === loc && _jsx(Check, { size: 10 })] }, loc))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest mb-3", children: [_jsx(Monitor, { size: 12 }), t.theme] }), _jsx("div", { className: "flex flex-col gap-1.5", children: [
                                    { id: "light", icon: Sun, label: t.themeLight },
                                    { id: "dark", icon: Moon, label: t.themeDark },
                                    { id: "system", icon: Monitor, label: t.themeSystem },
                                ].map((item) => (_jsxs("button", { "aria-label": `${t.theme}: ${item.label}`, onClick: () => handleThemeChange(item.id), className: cn("flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase transition-all duration-200 border cursor-pointer rounded-none", activeTheme === item.id
                                        ? "bg-primary/10 border-primary/30 text-primary"
                                        : "bg-card border-border hover:bg-muted text-muted-foreground"), children: [_jsx(item.icon, { size: 12 }), _jsx("span", { className: "flex-1 text-left ml-2", children: item.label }), activeTheme === item.id && _jsx(Check, { size: 10 })] }, item.id))) })] }), _jsx("div", { className: "mt-6 pt-4 border-t border-border", children: isAuthenticated ? (onLogout ? (_jsxs("button", { "aria-label": t.logout, onClick: onLogout, className: "w-full flex items-center gap-3 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none", children: [_jsx(LogOut, { size: 14 }), _jsx("span", { children: t.logout })] })) : (_jsxs("a", { href: logoutUrl, className: "w-full flex items-center gap-3 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none", children: [_jsx(LogOut, { size: 14 }), _jsx("span", { children: t.logout })] }))) : onLogin ? (_jsxs("button", { "aria-label": t.login, onClick: onLogin, className: "w-full flex items-center gap-3 px-3 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none", children: [_jsx(LogIn, { size: 14 }), _jsx("span", { children: t.login })] })) : (_jsxs("a", { href: "/api/auth/signin", className: "w-full flex items-center gap-3 px-3 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none", children: [_jsx(LogIn, { size: 14 }), _jsx("span", { children: t.login })] })) }), _jsx("div", { className: "mt-4 text-center", children: _jsx("span", { className: "text-[8px] font-mono uppercase tracking-[0.3em] text-muted-foreground/30", children: versionSignature }) })] }))] }));
}
//# sourceMappingURL=SystemSettings.js.map