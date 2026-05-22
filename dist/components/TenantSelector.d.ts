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
export declare function TenantSelector({ activeTenantId, tenants, onTenantChange, spaces, groups, activeContextId, onContextChange, userRole, translations, isLoading, }: TenantSelectorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TenantSelector.d.ts.map