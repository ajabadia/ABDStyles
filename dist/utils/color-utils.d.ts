/**
 * ABDStyles - Industrial Styling Color Utilities
 *
 * Safe, mathematical color processing algorithms including YIQ accessibility contrast,
 * bitwise luminance shifting for dark-mode adaptation, and standard Hex-to-HSL conversions.
 */
/**
 * Calculates whether black (#000000) or white (#ffffff) provides higher visual contrast
 * on a given background color using the standard YIQ accessibility formula.
 *
 * @param hexcolor - Hex color string (e.g. "#ef4444")
 * @returns "#000000" or "#ffffff"
 */
export declare function getContrastColor(hexcolor: string): string;
/**
 * Dynamically shifts the luminance of a hex color by a specified percentage.
 * Positive percent values lighten the color, negative values darken it.
 * Utilizes high-precision bitwise hexadecimal arithmetic.
 *
 * @param hex - Hex color string (e.g. "#3b82f6")
 * @param percent - Value between -100 and 100
 * @returns Shifted hex color string (e.g. "#4d90f7")
 */
export declare function adjustColor(hex: string, percent: number): string;
/**
 * Converts a standard hexadecimal color string into HSL component strings
 * compatible with Tailwind CSS v4 variables (space-separated, e.g. "217 91.2% 59.8%").
 * This format allows Tailwind to dynamically apply opacity modifiers (e.g., bg-primary/50).
 *
 * @param hex - Hex color string (e.g. "#3b82f6")
 * @returns Space-separated HSL components
 */
export declare function hexToHslComponents(hex: string): string;
//# sourceMappingURL=color-utils.d.ts.map