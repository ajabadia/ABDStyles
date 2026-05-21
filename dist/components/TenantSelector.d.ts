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
}
export interface TenantSelectorProps {
    activeTenantId: string;
    tenants: TenantOption[];
    onTenantChange?: (tenantId: string) => void;
    userRole?: string;
    translations?: TenantSelectorTranslations;
    isLoading?: boolean;
}
export declare function TenantSelector({ activeTenantId, tenants, onTenantChange, userRole, translations, isLoading, }: TenantSelectorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TenantSelector.d.ts.map