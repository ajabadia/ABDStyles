import React from 'react';

export interface FooterProps {
  className?: string;
  label?: string;
  telemetryItems?: Array<{ label: string; value: string }>;
  showSeparator?: boolean;
  separatorWidth?: 'full' | 'short';
  opacity?: number;
}

/**
 * 🏁 Footer
 * Centralized, style-compliant Tech-Noir footer component.
 * Ensures consistent monospace typeface, case, spacing, and tracking.
 */
export function Footer({
  className = '',
  label,
  telemetryItems,
  showSeparator = true,
  separatorWidth = 'full',
  opacity = 30
}: FooterProps) {
  // Map opacity levels to class strings compatible with standard Tailwind setups
  const opacityClass = 
    opacity <= 20 ? 'text-muted-foreground/20' : 
    opacity >= 40 ? 'text-muted-foreground/40' : 
    'text-muted-foreground/30';

  const separatorWidthClass = separatorWidth === 'short' ? 'w-24 mx-auto' : 'w-full';

  return (
    <footer 
      className={`mt-auto pt-12 flex flex-col items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] ${opacityClass} ${className}`}
      role="contentinfo"
    >
      {showSeparator && (
        <div 
          className={`h-[1px] bg-border/40 ${separatorWidthClass}`} 
          aria-hidden="true" 
        />
      )}
      
      {telemetryItems && telemetryItems.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-2">
          {telemetryItems.map((item, index) => (
            <span key={index}>
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      ) : (
        label && <span>{label}</span>
      )}
    </footer>
  );
}
