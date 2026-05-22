'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { Menu, X, Shield, LogOut } from "lucide-react";
import { cn } from "./utils.js";

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

const defaultTranslations: Required<TacticalSidebarTranslations> = {
  brandFallback: "ABD SYSTEM",
  logoutBtn: "TERMINAR SESIÓN",
  identityProvider: "IDENTITY PROVIDER",
  statusOnline: "ONLINE",
  emailLabel: "EMAIL",
};

export function TacticalSidebar({
  user,
  links,
  logoUrl,
  onLogout,
  brandName,
  LinkComponent,
  translations,
  activeHref,
  homeHref = "/dashboard",
  menuAriaLabel = "Toggle Tactical Menu",
}: TacticalSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const t = { ...defaultTranslations, ...translations };
  const Link = LinkComponent || (({ href, children, ...props }: LinkComponentProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  ));

  return (
    <>
      {/* 🍔 Botón Disparador (Floating Trigger) */}
      <button
        aria-label={menuAriaLabel}
        aria-expanded={isOpen}
        aria-controls="tactical-sidebar-panel"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-6 left-6 p-3 rounded-none bg-background/80 backdrop-blur-md shadow-lg border border-border hover:border-primary/40 hover:bg-muted transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-1 focus:ring-primary/40",
          isOpen ? "z-[55]" : "z-40"
        )}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-primary" />
        ) : (
          <Menu className="w-5 h-5 text-foreground" />
        )}
      </button>

      {/* 🌑 Velo de Fondo (Dark Overlay Backdrop) */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[45] bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        />
      )}

      {/* 🗄️ Contenedor del Drawer (Sidebar Panel) */}
      <aside
        id="tactical-sidebar-panel"
        role="navigation"
        aria-label="Tactical Navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out transform rounded-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header inside Sidebar */}
        <div className="flex justify-between items-center mb-8 pt-12 border-b border-border pb-4">
          <Link
            href={homeHref}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="w-6 h-6 object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
              />
            ) : (
              <div className="w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Shield size={12} className="text-primary" />
              </div>
            )}
            <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground">
              {user.tenantId || brandName || t.brandFallback}
            </span>
          </Link>
          <button
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-muted border border-border rounded-none text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 🧭 Navigation Links (Tactical Links) */}
        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = activeHref
              ? activeHref === link.href ||
                (link.href !== homeHref && activeHref.startsWith(link.href))
              : false;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-none flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border",
                  isActive
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted/10 border-border text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                )}
              >
                <span className="shrink-0">{link.icon}</span>
                <span className="flex-1 truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ⚙️ Tarjeta de Sesión Cyber-Industrial (Bottom Card) */}
        <div className="border-t border-border pt-6 mt-auto">
          <div className="flex flex-col gap-4 p-4 border border-border bg-muted/10 rounded-none relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary rounded-none">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black tracking-wider truncate uppercase text-foreground">
                  {user.name}
                </p>
                <p className="font-mono text-[8px] text-muted-foreground/80 uppercase tracking-widest truncate">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="font-mono text-[8px] text-muted-foreground/60 flex flex-col gap-1 border-t border-border/50 pt-2.5">
              <div className="flex justify-between">
                <span>{t.identityProvider}:</span>
                <span className="text-primary font-bold">{t.statusOnline}</span>
              </div>
              {user.email && (
                <div className="flex justify-between">
                  <span>{t.emailLabel}:</span>
                  <span className="truncate max-w-[150px]">
                    {user.email.toLowerCase()}
                  </span>
                </div>
              )}
            </div>

            <button
              aria-label={t.logoutBtn}
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-border text-[9px] font-mono font-black uppercase tracking-widest transition-all rounded-none hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 cursor-pointer"
            >
              <LogOut size={12} />
              <span>{t.logoutBtn}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
