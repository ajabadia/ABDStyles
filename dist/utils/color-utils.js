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
export function getContrastColor(hexcolor) {
    if (!hexcolor || !hexcolor.startsWith('#'))
        return '#ffffff';
    try {
        const r = parseInt(hexcolor.substring(1, 3), 16);
        const g = parseInt(hexcolor.substring(3, 5), 16);
        const b = parseInt(hexcolor.substring(5, 7), 16);
        // YIQ formula
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    }
    catch (e) {
        return '#ffffff';
    }
}
/**
 * Dynamically shifts the luminance of a hex color by a specified percentage.
 * Positive percent values lighten the color, negative values darken it.
 * Utilizes high-precision bitwise hexadecimal arithmetic.
 *
 * @param hex - Hex color string (e.g. "#3b82f6")
 * @param percent - Value between -100 and 100
 * @returns Shifted hex color string (e.g. "#4d90f7")
 */
export function adjustColor(hex, percent) {
    if (!hex || !hex.startsWith('#'))
        return hex;
    try {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        const rVal = R < 255 ? (R < 0 ? 0 : R) : 255;
        const gVal = G < 255 ? (G < 0 ? 0 : G) : 255;
        const bVal = B < 255 ? (B < 0 ? 0 : B) : 255;
        return "#" + (0x1000000 + rVal * 0x10000 + gVal * 0x100 + bVal).toString(16).slice(1);
    }
    catch (e) {
        return hex;
    }
}
/**
 * Converts a standard hexadecimal color string into HSL component strings
 * compatible with Tailwind CSS v4 variables (space-separated, e.g. "217 91.2% 59.8%").
 * This format allows Tailwind to dynamically apply opacity modifiers (e.g., bg-primary/50).
 *
 * @param hex - Hex color string (e.g. "#3b82f6")
 * @returns Space-separated HSL components
 */
export function hexToHslComponents(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    const hDeg = Math.round(h * 360);
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);
    return `${hDeg} ${sPct}% ${lPct}%`;
}
//# sourceMappingURL=color-utils.js.map