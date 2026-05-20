'use client';

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Settings, X, LogIn, LogOut, Sun, Moon, Monitor, Languages, Check } from "lucide-react";
import { cn } from "./utils.js";

export interface SystemSettingsTranslations {
  title?: string;
  close?: string;
  language?: string;
  theme?: string;
  themeLight?: string;
  themeDark?: string;
  themeSystem?: string;
  logout?: string;
  login?: string;
}

export interface SystemSettingsProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
  locales?: string[];

  // Optional theme state/callback to delegate to parent (e.g. next-themes)
  theme?: string;
  onThemeChange?: (theme: string) => void;

  // Custom translatable strings
  translations?: SystemSettingsTranslations;

  // Authentication props
  isAuthenticated?: boolean;
  /** Callback for custom login logic. If omitted, falls back to signinUrl navigation. */
  onLogin?: () => void;
  /** Callback for custom logout logic. If omitted, falls back to logoutUrl navigation. */
  onLogout?: () => void;
  /** URL to navigate to when logging out (fallback if onLogout is not provided). */
  logoutUrl?: string;
  /** URL to navigate to when logging in (fallback if onLogin is not provided). */
  signinUrl?: string;

  // Optional version indicator
  versionSignature?: string;
}

const defaultTranslations: Required<SystemSettingsTranslations> = {
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

export function SystemSettings({
  locale,
  onLocaleChange,
  locales = ["es", "en"],
  theme,
  onThemeChange,
  translations,
  isAuthenticated = false,
  onLogin,
  onLogout,
  logoutUrl = "/api/auth/logout",
  signinUrl = "/api/auth/signin",
  versionSignature = "ABD_SYSTEM_V1.0",
}: SystemSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Local theme state if not controlled by parent
  const [internalTheme, setInternalTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const activeTheme = theme !== undefined ? theme : internalTheme;

  const handleThemeChange = (newTheme: string) => {
    if (onThemeChange) {
      onThemeChange(newTheme);
    } else {
      setInternalTheme(newTheme);
      if (typeof window === "undefined") return;
      localStorage.setItem("theme", newTheme);
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      if (newTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(newTheme);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
    return (
      <button
        aria-label="Loading Settings"
        disabled
        className="p-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md opacity-60 cursor-not-allowed"
      >
        <Settings size={18} className="text-muted-foreground animate-pulse" />
      </button>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        aria-label="Open Settings"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted transition-all active:scale-90 cursor-pointer shadow-lg",
          isOpen && "bg-muted ring-1 ring-primary/20 border-primary/30"
        )}
      >
        <Settings
          size={18}
          className={cn(
            "text-foreground transition-transform duration-500",
            isOpen && "rotate-90 text-primary"
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-64 bg-background/95 border border-border backdrop-blur-md z-[100] overflow-hidden rounded-none shadow-2xl p-4 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out"
          role="region"
          aria-label="System Settings Menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
              {t.title}
            </span>
            <button
              aria-label={t.close}
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Language Selector */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest mb-3">
              <Languages size={12} />
              {t.language}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  aria-label={`${t.language}: ${loc.toUpperCase()}`}
                  onClick={() => onLocaleChange(loc)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase transition-all duration-200 border cursor-pointer rounded-none",
                    locale === loc
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-card border-border hover:bg-muted text-muted-foreground"
                  )}
                >
                  {loc}
                  {locale === loc && <Check size={10} />}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest mb-3">
              <Monitor size={12} />
              {t.theme}
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { id: "light", icon: Sun, label: t.themeLight },
                { id: "dark", icon: Moon, label: t.themeDark },
                { id: "system", icon: Monitor, label: t.themeSystem },
              ].map((item) => (
                <button
                  key={item.id}
                  aria-label={`${t.theme}: ${item.label}`}
                  onClick={() => handleThemeChange(item.id)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase transition-all duration-200 border cursor-pointer rounded-none",
                    activeTheme === item.id
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-card border-border hover:bg-muted text-muted-foreground"
                  )}
                >
                  <item.icon size={12} />
                  <span className="flex-1 text-left ml-2">{item.label}</span>
                  {activeTheme === item.id && <Check size={10} />}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div className="mt-6 pt-4 border-t border-border">
            {isAuthenticated ? (
              onLogout ? (
                <button
                  aria-label={t.logout}
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none"
                >
                  <LogOut size={14} />
                  <span>{t.logout}</span>
                </button>
              ) : (
                <a
                  href={logoutUrl}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none"
                >
                  <LogOut size={14} />
                  <span>{t.logout}</span>
                </a>
              )
            ) : onLogin ? (
              <button
                aria-label={t.login}
                onClick={onLogin}
                className="w-full flex items-center gap-3 px-3 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none"
              >
                <LogIn size={14} />
                <span>{t.login}</span>
              </button>
            ) : (
              <a
                href={signinUrl}
                className="w-full flex items-center gap-3 px-3 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none"
              >
                <LogIn size={14} />
                <span>{t.login}</span>
              </a>
            )}
          </div>

          {/* Footer Version Signature */}
          <div className="mt-4 text-center">
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-muted-foreground/30">
              {versionSignature}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
