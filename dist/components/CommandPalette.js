'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Terminal, CornerDownLeft } from 'lucide-react';
export function CommandPalette({ commands, placeholder = 'Escribe un comando o busca...', triggerElementId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    // Toggle Command Palette on Ctrl+K / Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    // Listen to custom trigger element if provided
    useEffect(() => {
        if (!triggerElementId)
            return;
        const trigger = document.getElementById(triggerElementId);
        if (!trigger)
            return;
        const handleTriggerClick = (e) => {
            e.preventDefault();
            setIsOpen(true);
        };
        trigger.addEventListener('click', handleTriggerClick);
        return () => trigger.removeEventListener('click', handleTriggerClick);
    }, [triggerElementId]);
    // Focus input when palette opens
    useEffect(() => {
        if (isOpen) {
            setSearch('');
            setActiveIndex(0);
            // Small timeout to ensure input is mounted
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);
    // Filter commands based on search
    const filteredCommands = useMemo(() => {
        if (!search.trim())
            return commands;
        const term = search.toLowerCase();
        return commands.filter((cmd) => cmd.title.toLowerCase().includes(term) ||
            cmd.category.toLowerCase().includes(term) ||
            cmd.description?.toLowerCase().includes(term));
    }, [commands, search]);
    // Handle active index boundaries when filtered list changes
    useEffect(() => {
        setActiveIndex(0);
    }, [filteredCommands]);
    // Keyboard navigation inside the palette
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[activeIndex]) {
                executeCommand(filteredCommands[activeIndex]);
            }
        }
    };
    const executeCommand = async (cmd) => {
        setIsOpen(false);
        try {
            await cmd.action();
        }
        catch (err) {
            console.error('Error executing command:', err);
        }
    };
    // Scroll active item into view
    useEffect(() => {
        if (!listRef.current)
            return;
        const activeEl = listRef.current.querySelector('[data-active="true"]');
        if (activeEl) {
            activeEl.scrollIntoView({ block: 'nearest' });
        }
    }, [activeIndex]);
    if (!isOpen)
        return null;
    // Group commands by category for display
    const groupedCommands = {};
    filteredCommands.forEach((cmd) => {
        if (!groupedCommands[cmd.category]) {
            groupedCommands[cmd.category] = [];
        }
        groupedCommands[cmd.category].push(cmd);
    });
    // Flat list reference to map group indexes to flat list index
    let flatIndexCounter = 0;
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4", onKeyDown: handleKeyDown, children: [_jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300", onClick: () => setIsOpen(false) }), _jsxs("div", { className: "relative w-full max-w-xl bg-zinc-950/90 border border-white/10 rounded-xl shadow-2xl shadow-black overflow-hidden flex flex-col transition-all duration-200 transform scale-100 max-h-[50vh]", children: [_jsx("div", { className: "absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" }), _jsxs("div", { className: "relative flex items-center border-b border-white/5 px-4 py-3.5 z-10", children: [_jsx(Search, { className: "w-5 h-5 text-white/40 mr-3 shrink-0" }), _jsx("input", { ref: inputRef, type: "text", className: "w-full bg-transparent text-white text-base outline-none border-none placeholder-white/30", placeholder: placeholder, value: search, onChange: (e) => setSearch(e.target.value) }), _jsx("div", { className: "flex items-center space-x-1 ml-2 shrink-0", children: _jsx("kbd", { className: "px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white/50 border border-white/5 uppercase", children: "esc" }) })] }), _jsx("div", { ref: listRef, className: "flex-1 overflow-y-auto py-2 px-2 z-10 max-h-[35vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent", children: filteredCommands.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-10 px-4 text-center", children: [_jsx(Terminal, { className: "w-8 h-8 text-white/20 mb-2" }), _jsx("p", { className: "text-white/60 text-sm font-medium", children: "No se encontraron comandos" }), _jsx("p", { className: "text-white/30 text-xs mt-1", children: "Prueba a escribir otra palabra clave" })] })) : (Object.keys(groupedCommands).map((category) => (_jsxs("div", { className: "mb-2 last:mb-0", children: [_jsx("div", { className: "px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white/30 uppercase select-none", children: category }), _jsx("div", { className: "space-y-0.5", children: groupedCommands[category].map((cmd) => {
                                        const currentFlatIndex = flatIndexCounter++;
                                        const isActive = currentFlatIndex === activeIndex;
                                        return (_jsxs("div", { "data-active": isActive, className: `group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${isActive
                                                ? 'bg-white/10 text-white'
                                                : 'text-white/60 hover:bg-white/5 hover:text-white'}`, onClick: () => executeCommand(cmd), onMouseEnter: () => setActiveIndex(currentFlatIndex), children: [_jsxs("div", { className: "flex items-center min-w-0 mr-3", children: [_jsx("div", { className: `flex items-center justify-center w-6 h-6 rounded mr-3 shrink-0 transition-colors duration-150 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`, children: cmd.icon || _jsx(Terminal, { className: "w-4 h-4" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("span", { className: "block text-sm font-medium truncate", children: cmd.title }), cmd.description && (_jsx("span", { className: `block text-xs truncate transition-colors duration-150 ${isActive
                                                                        ? 'text-white/60'
                                                                        : 'text-white/30 group-hover:text-white/40'}`, children: cmd.description }))] })] }), _jsx("div", { className: "flex items-center space-x-1 shrink-0", children: cmd.shortcut ? (cmd.shortcut.map((key, idx) => (_jsx("kbd", { className: `px-1 py-0.5 text-[9px] font-mono rounded border transition-colors duration-150 uppercase ${isActive
                                                            ? 'bg-white/20 border-white/20 text-white/80'
                                                            : 'bg-white/5 border-white/5 text-white/30 group-hover:text-white/40'}`, children: key }, idx)))) : (isActive && (_jsxs("span", { className: "text-[10px] text-white/40 flex items-center font-mono uppercase", children: ["ejecutar ", _jsx(CornerDownLeft, { className: "w-3 h-3 ml-1" })] }))) })] }, cmd.id));
                                    }) })] }, category)))) }), _jsxs("div", { className: "border-t border-white/5 px-4 py-2 bg-zinc-950 flex items-center justify-between text-[10px] text-white/30 select-none z-10 shrink-0", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("span", { children: [_jsx("kbd", { className: "px-1 py-0.5 rounded bg-white/5 border border-white/5", children: "\u2191\u2193" }), " Navegar"] }), _jsxs("span", { children: [_jsx("kbd", { className: "px-1 py-0.5 rounded bg-white/5 border border-white/5", children: "enter" }), " Seleccionar"] })] }), _jsx("div", { children: _jsx("span", { children: "Conmutador R\u00E1pido" }) })] })] })] }));
}
//# sourceMappingURL=CommandPalette.js.map