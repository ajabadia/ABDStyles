import { hexToHslComponents, getContrastColor, adjustColor } from '../utils/color-utils.js';
import { themeSchema, type TenantThemeConfig } from '../validation/branding-schema.js';

/**
 * Generates an optimized, highly robust CSS injection block to customize
 * Tailwind CSS v4 and standard CSS custom properties.
 * 
 * Safely parses the inputs, checks for accessibility contrasts (YIQ),
 * shifts colors for dark-mode harmony, and configures borders.
 * 
 * @param config - Theme configuration to render
 * @returns A safe, raw CSS string block to be injected directly in layout heads.
 */
export function generateTenantCss(config: unknown): string {
  // Validate and parse schema safely with defaults
  let parsed: TenantThemeConfig;
  try {
    parsed = themeSchema.parse(config);
  } catch (err) {
    // If validation fails, fall back to safe industrial defaults (Tech-Noir Cyan)
    parsed = {
      primary: '#06b6d4', // cyan-500
      secondary: '#1e293b', // slate-800
      rounded: true,
      radius: '0.15rem'
    };
  }

  const primaryHex = parsed.primary;
  const primaryHsl = hexToHslComponents(primaryHex);
  const primaryFgHex = getContrastColor(primaryHex);
  const primaryFgHsl = hexToHslComponents(primaryFgHex);
  
  // Calculate secondary values if present
  let secondaryCss = '';
  if (parsed.secondary) {
    const secHex = parsed.secondary;
    const secHsl = hexToHslComponents(secHex);
    const secFgHex = getContrastColor(secHex);
    const secFgHsl = hexToHslComponents(secFgHex);
    secondaryCss = `
    --secondary: ${secHsl} !important;
    --secondary-foreground: ${secFgHsl} !important;`;
  }

  // Calculate background overrides if present
  let bgCss = '';
  if (parsed.background) {
    const bgHex = parsed.background;
    const bgHsl = hexToHslComponents(bgHex);
    const bgFgHex = getContrastColor(bgHex);
    const bgFgHsl = hexToHslComponents(bgFgHex);
    bgCss = `
    --background: ${bgHsl} !important;
    --foreground: ${bgFgHsl} !important;`;
  }

  // Shift primary color for dark-mode adaptation (lighten primary slightly for deep tech-noir canvas contrast)
  const primaryDarkHex = adjustColor(primaryHex, 15);
  const primaryDarkHsl = hexToHslComponents(primaryDarkHex);
  const primaryDarkFgHex = getContrastColor(primaryDarkHex);
  const primaryDarkFgHsl = hexToHslComponents(primaryDarkFgHex);

  // Border-radius calculation
  let radiusValue = '0px';
  if (parsed.rounded) {
    radiusValue = parsed.radius || '0.75rem';
  }

  return `/* ABDStyles Dynamic Multi-Tenant Injection Gateway */
:root {
  --primary: ${primaryHsl} !important;
  --primary-foreground: ${primaryFgHsl} !important;
  --ring: ${primaryHsl} !important;
  --radius: ${radiusValue} !important;${secondaryCss}${bgCss}
}

.dark {
  --primary: ${primaryDarkHsl} !important;
  --primary-foreground: ${primaryDarkFgHsl} !important;
  --ring: ${primaryDarkHsl} !important;
}`;
}
