// LiveLogViewer component – shared live telemetry UI
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useLivePolling } from '../hooks/useLivePolling.js';
import { featureFlags } from '../config/featureFlags.js';
import { ActionBadge } from './ActionBadge.js';
import { AuditDeltaViewer } from './AuditDeltaViewer.js';
// Simple translation fallback
const t = (key, opts) => opts?.defaultMessage || key;
import { Activity, Calendar, User, Wifi, WifiOff, ShieldCheck, BookOpen, Building2 } from 'lucide-react';
export function LiveLogViewer({ tenantId }) {
    const { logs, loading, newLogIds, isLive, toggleLive, lastFetched } = useLivePolling({ tenantId });
    if (!featureFlags.liveModeEnabled) {
        return _jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "Live telemetry is disabled." });
    }
    // Simple table rendering – can be styled further
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: toggleLive, className: `flex items-center gap-1 px-3 py-1 rounded text-sm font-bold ${isLive ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-zinc-700/20 border-zinc-600/30 text-zinc-500'}`, children: [isLive ? _jsx(Wifi, { className: "w-4 h-4" }) : _jsx(WifiOff, { className: "w-4 h-4" }), isLive ? t('live_on', { defaultMessage: 'Live ON' }) : t('live_off', { defaultMessage: 'Live OFF' })] }), lastFetched && (_jsxs("span", { className: "text-xs text-muted-foreground", children: [t('synced_at', { defaultMessage: 'Sync:' }), ' ', lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })] }))] }), loading ? (_jsx("div", { className: "p-4", children: t('loading', { defaultMessage: 'Loading...' }) })) : (_jsx("div", { className: "grid gap-3", children: logs.map((log) => {
                    const isNew = log._id && newLogIds.has(log._id);
                    const logDate = log.createdAt ? new Date(log.createdAt) : null;
                    const timeStr = logDate ? logDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
                    const dateStr = logDate ? logDate.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }) : '';
                    return (_jsxs("div", { className: `p-3 rounded border transition-colors ${isNew ? 'bg-emerald-100 animate-pulse' : 'bg-card border-border hover:bg-secondary/10'}`, children: [_jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ActionBadge, { action: log.action }), _jsxs("span", { className: "font-mono text-xs bg-background border border-border px-2 py-0.5 rounded", children: ["ID: ", log._id?.slice(-6) ?? '------'] }), log.appId && (_jsx("span", { className: "font-mono text-xs uppercase bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded", children: log.appId }))] }), _jsxs("div", { className: "text-xs text-muted-foreground", children: [dateStr, " ", timeStr] })] }), _jsx(AuditDeltaViewer, { log: log })] }, log._id));
                }) }))] }));
}
//# sourceMappingURL=LiveLogViewer.js.map