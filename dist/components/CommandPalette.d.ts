import React from 'react';
export interface Command {
    id: string;
    title: string;
    description?: string;
    category: string;
    action: () => void | Promise<void>;
    icon?: React.ReactNode;
    shortcut?: string[];
}
export interface CommandPaletteProps {
    commands: Command[];
    placeholder?: string;
    triggerElementId?: string;
}
export declare function CommandPalette({ commands, placeholder, triggerElementId }: CommandPaletteProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=CommandPalette.d.ts.map