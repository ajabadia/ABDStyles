'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useTranslations } from 'next-intl';
import { FileCode, Tag } from 'lucide-react';
export function AuditDeltaViewer({ log }) {
    const t = useTranslations('admin');
    const changes = log.changedFields || {};
    const previous = log.previousState || {};
    const formatValue = (val) => {
        if (val === null || val === undefined)
            return 'null';
        if (typeof val === 'object')
            return JSON.stringify(val);
        return String(val);
    };
    return (_jsxs("div", { className: "grid gap-3 p-4 rounded-lg bg-secondary/15 border border-border font-mono text-xs text-foreground/90 max-h-72 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center gap-1.5 border-b border-border pb-2 text-[10px] uppercase tracking-wider text-primary font-bold", children: [_jsx(FileCode, { className: "w-3.5 h-3.5 text-primary" }), t('audit_delta_title', { defaultMessage: 'Comparación de Estados (Delta)' })] }), Object.keys(changes).length === 0 ? (_jsx("span", { className: "text-muted-foreground italic", children: t('audit_no_details', { defaultMessage: 'No hay detalles adicionales.' }) })) : (Object.keys(changes).map(key => {
                if (key === 'updatedAt' || key === 'createdAt' || key === '_id')
                    return null;
                const prevValue = previous[key];
                const newValue = changes[key];
                return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-border/10 last:border-b-0 items-start", children: [_jsxs("div", { className: "font-bold text-primary flex items-center gap-1.5", children: [_jsx(Tag, { className: "w-3.5 h-3.5 opacity-60 text-primary" }), key] }), _jsxs("div", { className: "md:col-span-2 grid gap-1.5", children: [prevValue !== undefined && (_jsxs("div", { className: "flex items-center gap-2 text-rose-500 bg-rose-500/5 px-2.5 py-0.5 rounded border border-rose-500/10 w-fit", children: [_jsx("span", { className: "text-[9px] uppercase font-semibold tracking-wider opacity-60", children: t('audit_previous', { defaultMessage: 'Previo:' }) }), _jsx("span", { className: "break-all font-bold", children: formatValue(prevValue) })] })), _jsxs("div", { className: "flex items-center gap-2 text-emerald-500 bg-emerald-500/5 px-2.5 py-0.5 rounded border border-emerald-500/10 w-fit", children: [_jsx("span", { className: "text-[9px] uppercase font-semibold tracking-wider opacity-60", children: t('audit_new', { defaultMessage: 'Nuevo:' }) }), _jsx("span", { className: "break-all font-bold", children: formatValue(newValue) })] })] })] }, key));
            }))] }));
}
//# sourceMappingURL=AuditDeltaViewer.js.map