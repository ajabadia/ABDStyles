'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Activity, Settings, Layers, Shield } from 'lucide-react';
export function ActionBadge({ action }) {
    const t = useTranslations('admin');
    switch (action) {
        case 'CREATE_SPACE':
            return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20", children: [_jsx(Layers, { className: "w-3 h-3" }), t('audit_action_create_space', { defaultMessage: 'Creación Espacio' })] }));
        case 'UPDATE_SPACE':
            return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20", children: [_jsx(Layers, { className: "w-3 h-3" }), t('audit_action_update_space', { defaultMessage: 'Edición Espacio' })] }));
        case 'MOVE_SPACE':
            return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20", children: [_jsx(Activity, { className: "w-3 h-3" }), t('audit_action_move_space', { defaultMessage: 'Traslado Espacio' })] }));
        case 'HERITAGE_VISIBILITY':
            return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20", children: [_jsx(Shield, { className: "w-3 h-3" }), t('audit_action_heritage_visibility', { defaultMessage: 'Herencia Permisos' })] }));
        case 'UPDATE_BRANDING':
            return (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20", children: [_jsx(Settings, { className: "w-3 h-3" }), t('audit_action_update_branding', { defaultMessage: 'Marca Blanca' })] }));
        default:
            return (_jsx("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-secondary text-muted-foreground border border-border", children: action }));
    }
}
//# sourceMappingURL=ActionBadge.js.map