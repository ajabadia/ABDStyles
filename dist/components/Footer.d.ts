export interface FooterProps {
    className?: string;
    label?: string;
    telemetryItems?: Array<{
        label: string;
        value: string;
    }>;
    showSeparator?: boolean;
    separatorWidth?: 'full' | 'short';
    opacity?: 'low' | 'normal' | 'high';
}
/**
 * 🏁 Footer
 * Centralized, style-compliant Tech-Noir footer component.
 * Ensures consistent monospace typeface, case, spacing, and tracking.
 */
export declare function Footer({ className, label, telemetryItems, showSeparator, separatorWidth, opacity }: FooterProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Footer.d.ts.map