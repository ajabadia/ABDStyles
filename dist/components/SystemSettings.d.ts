export interface SystemSettingsTranslations {
    title?: string;
    close?: string;
    language?: string;
    theme?: string;
    themeLight?: string;
    themeDark?: string;
    themeSystem?: string;
    logout?: string;
    login?: string;
}
export interface SystemSettingsProps {
    locale: string;
    onLocaleChange: (locale: string) => void;
    locales?: string[];
    theme?: string;
    onThemeChange?: (theme: string) => void;
    translations?: SystemSettingsTranslations;
    isAuthenticated?: boolean;
    onLogin?: () => void;
    onLogout?: () => void;
    logoutUrl?: string;
    versionSignature?: string;
}
export declare function SystemSettings({ locale, onLocaleChange, locales, theme, onThemeChange, translations, isAuthenticated, onLogin, onLogout, logoutUrl, versionSignature, }: SystemSettingsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SystemSettings.d.ts.map