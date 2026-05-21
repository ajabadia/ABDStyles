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
    /** Callback for custom login logic. If omitted, falls back to signinUrl navigation. */
    onLogin?: () => void;
    /** Callback for custom logout logic. If omitted, falls back to logoutUrl navigation. */
    onLogout?: () => void;
    /** URL to navigate to when logging out (fallback if onLogout is not provided). */
    logoutUrl?: string;
    /** URL to navigate to when logging in (fallback if onLogin is not provided). */
    signinUrl?: string;
    /** Whether to show the login button when not authenticated. Defaults to true. */
    showLogin?: boolean;
    versionSignature?: string;
}
export declare function SystemSettings({ locale, onLocaleChange, locales, theme, onThemeChange, translations, isAuthenticated, onLogin, onLogout, logoutUrl, signinUrl, showLogin, versionSignature, }: SystemSettingsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SystemSettings.d.ts.map