interface UseLivePollingOptions {
    tenantId: string;
    pollInterval?: number;
}
export interface AuditLog {
    _id: string;
    appId: string;
    action: string;
    entityId?: string;
    entityType?: string;
    createdAt?: string;
    userEmail?: string;
    changedFields?: Record<string, unknown>;
    previousState?: Record<string, unknown>;
}
export declare function useLivePolling({ tenantId, pollInterval }: UseLivePollingOptions): {
    logs: AuditLog[];
    loading: boolean;
    newLogIds: Set<string>;
    isLive: boolean;
    toggleLive: () => void;
    lastFetched: Date | null;
};
export {};
//# sourceMappingURL=useLivePolling.d.ts.map