'use client';

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Building2, ChevronDown, Search, X, Check, Loader2 } from "lucide-react";
import { cn } from "./utils.js";

export interface ContextOption {
  id: string;
  name: string;
}

export interface TenantOption {
  tenantId: string;
  name: string;
  active?: boolean;
}

export interface TenantSelectorTranslations {
  title?: string;
  searchPlaceholder?: string;
  noTenantsFound?: string;
  activeTenantBadge?: string;
  selectTenant?: string;
  spacesTitle?: string;
  groupsTitle?: string;
}

export interface TenantSelectorProps {
  activeTenantId: string;
  tenants: TenantOption[];
  onTenantChange?: (tenantId: string) => void;
  spaces?: ContextOption[];
  groups?: ContextOption[];
  activeContextId?: string;
  onContextChange?: (contextId: string, type: 'space' | 'group') => void;
  userRole?: string;
  translations?: TenantSelectorTranslations;
  isLoading?: boolean;
}

const defaultTranslations: Required<TenantSelectorTranslations> = {
  title: "ORGANIZACIÓN",
  searchPlaceholder: "Buscar organización...",
  noTenantsFound: "No se encontraron organizaciones",
  activeTenantBadge: "ORGANIZACIÓN ACTIVA",
  selectTenant: "Seleccionar organización",
  spacesTitle: "ESPACIOS",
  groupsTitle: "GRUPOS",
};

export function TenantSelector({
  activeTenantId,
  tenants = [],
  onTenantChange,
  spaces = [],
  groups = [],
  activeContextId,
  onContextChange,
  userRole = "USER",
  translations,
  isLoading = false,
}: TenantSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const t = { ...defaultTranslations, ...translations };

  // Detect if user has privilege to switch context
  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const hasContexts = spaces.length > 0 || groups.length > 0;
  const isInteractive = isSuperAdmin || tenants.length > 1 || hasContexts;

  // Resolve active tenant object
  const activeTenant = tenants.find((ten) => ten.tenantId === activeTenantId) || {
    tenantId: activeTenantId,
    name: activeTenantId,
  };

  // Resolve active context object
  const activeContext = spaces.find(s => s.id === activeContextId) || groups.find(g => g.id === activeContextId);
  const displayLabel = activeContext ? `${activeTenant.name} / ${activeContext.name}` : activeTenant.name;

  // Filter tenants based on search input
  const filteredTenants = tenants.filter(
    (ten) =>
      ten.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ten.tenantId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter contexts based on search input
  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Reset search query when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 border border-border bg-background/50 text-[10px] font-bold text-muted-foreground">
        <Building2 size={14} className="animate-pulse" />
        <span className="truncate max-w-[120px] uppercase tracking-wider">
          {displayLabel}
        </span>
      </div>
    );
  }

  // Render non-interactive badge for standard users/admins with single tenant
  if (!isInteractive) {
    return (
      <div 
        title={t.activeTenantBadge}
        className="flex items-center gap-2 px-3 py-2.5 border border-border/80 bg-background/40 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80 font-sans backdrop-blur-md select-none"
      >
        <Building2 size={13} className="text-muted-foreground/60 shrink-0" />
        <span className="truncate max-w-[140px]">
          {displayLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-3 px-3 py-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted text-foreground transition-all duration-200 cursor-pointer shadow-lg text-[10px] font-black uppercase tracking-[0.15em] font-sans min-w-[160px] max-w-[240px]",
          isOpen && "bg-muted ring-1 ring-primary/20 border-primary/30 text-primary"
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {isLoading ? (
            <Loader2 size={13} className="animate-spin text-primary shrink-0" />
          ) : (
            <Building2 size={13} className={cn("shrink-0 transition-colors", isOpen ? "text-primary" : "text-muted-foreground")} />
          )}
          <span className="truncate text-left">
            {displayLabel}
          </span>
        </div>
        <ChevronDown 
          size={13} 
          className={cn(
            "text-muted-foreground shrink-0 transition-transform duration-300", 
            isOpen && "rotate-180 text-primary"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-72 bg-background/95 border border-border backdrop-blur-md z-[100] overflow-hidden rounded-none shadow-2xl p-3 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out"
          role="listbox"
          aria-label={t.selectTenant}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-border">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground italic flex items-center gap-1.5">
              <Building2 size={10} className="text-primary" />
              {t.title}
            </span>
            <button
              type="button"
              aria-label="Cerrar selector"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative mb-2 flex items-center">
            <Search size={12} className="absolute left-2.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-card/60 hover:bg-card focus:bg-card border border-border hover:border-border/80 focus:border-primary/40 focus:ring-0 text-[10px] pl-8 pr-2 py-1.5 rounded-none text-foreground placeholder-muted-foreground font-sans focus:outline-none transition-colors"
              autoFocus
            />
          </div>

            {/* Tenants List */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center py-6 text-[10px] text-muted-foreground font-sans gap-2">
                  <Loader2 size={12} className="animate-spin text-primary" />
                  Cargando organizaciones...
                </div>
              ) : filteredTenants.length === 0 ? (
                <div className="text-center py-4 text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                  {t.noTenantsFound}
                </div>
              ) : (
                filteredTenants.map((ten) => {
                  const isSelected = ten.tenantId === activeTenantId;
                  return (
                    <button
                      key={ten.tenantId}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        if (onTenantChange && !isSelected) {
                          onTenantChange(ten.tenantId);
                        }
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-2.5 py-2 text-[10px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                        isSelected
                          ? "bg-primary/10 border-primary/20 text-primary font-bold"
                          : "bg-card/30 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className="flex flex-col truncate pr-2">
                        <span className="font-bold truncate">{ten.name}</span>
                        <span className="text-[8px] opacity-60 font-mono lowercase tracking-normal">
                          @{ten.tenantId}
                        </span>
                      </div>
                      {isSelected && <Check size={12} className="text-primary shrink-0 ml-2" />}
                    </button>
                  );
                })
              )}
            </div>

            {/* Contexts (Spaces) */}
            {filteredSpaces.length > 0 && (
              <div className="mt-3 pt-2 border-t border-border/50">
                <div className="flex items-center gap-1.5 mb-1.5 px-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                    {t.spacesTitle}
                  </span>
                </div>
                <div className="space-y-1">
                  {filteredSpaces.map((space) => {
                    const isSelected = space.id === activeContextId;
                    return (
                      <button
                        key={space.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          if (onContextChange && !isSelected) {
                            onContextChange(space.id, 'space');
                          }
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-2.5 py-1.5 text-[9px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                          isSelected
                            ? "bg-primary/10 border-primary/20 text-primary font-bold"
                            : "bg-card/20 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className="flex flex-col truncate pr-2">
                          <span className="font-bold truncate">{space.name}</span>
                        </div>
                        {isSelected && <Check size={10} className="text-primary shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contexts (Groups) */}
            {filteredGroups.length > 0 && (
              <div className="mt-3 pt-2 border-t border-border/50">
                <div className="flex items-center gap-1.5 mb-1.5 px-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                    {t.groupsTitle}
                  </span>
                </div>
                <div className="space-y-1">
                  {filteredGroups.map((group) => {
                    const isSelected = group.id === activeContextId;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          if (onContextChange && !isSelected) {
                            onContextChange(group.id, 'group');
                          }
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-2.5 py-1.5 text-[9px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                          isSelected
                            ? "bg-primary/10 border-primary/20 text-primary font-bold"
                            : "bg-card/20 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className="flex flex-col truncate pr-2">
                          <span className="font-bold truncate">{group.name}</span>
                        </div>
                        {isSelected && <Check size={10} className="text-primary shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
