'use strict';

var zod = require('zod');
require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/utils/color-utils.ts
function getContrastColor(hexcolor) {
  if (!hexcolor || !hexcolor.startsWith("#")) return "#ffffff";
  try {
    let cleanHex = hexcolor.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("");
    }
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1e3;
    return yiq >= 128 ? "#000000" : "#ffffff";
  } catch (e) {
    return "#ffffff";
  }
}
function adjustColor(hex, percent) {
  if (percent < -100 || percent > 100) return hex;
  if (!hex || !hex.startsWith("#")) return hex;
  try {
    let cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("");
    }
    const num = parseInt(cleanHex, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 255) + amt;
    const B = (num & 255) + amt;
    const rVal = R < 255 ? R < 0 ? 0 : R : 255;
    const gVal = G < 255 ? G < 0 ? 0 : G : 255;
    const bVal = B < 255 ? B < 0 ? 0 : B : 255;
    return "#" + (16777216 + rVal * 65536 + gVal * 256 + bVal).toString(16).slice(1);
  } catch (e) {
    return hex;
  }
}
function hexToHslComponents(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
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
var hexColorSchema = zod.z.string().regex(/^#[0-9a-fA-F]{6}$/, {
  message: "Must be a valid 6-digit hex color starting with '#' (e.g., '#ef4444')"
});
var themeSchema = zod.z.object({
  primary: hexColorSchema,
  secondary: hexColorSchema.optional(),
  accent: hexColorSchema.optional(),
  background: hexColorSchema.optional(),
  rounded: zod.z.boolean().optional().default(true),
  radius: zod.z.string().regex(/^[0-9.]+(rem|px|em|%)$/).optional()
});
var brandingSchema = zod.z.object({
  logoUrl: zod.z.string().url({ message: "Logo URL must be a valid HTTPS absolute URL" }).regex(/^https:\/\/([a-zA-Z0-9-]+\.)+([a-zA-Z0-9-]+)(\/[a-zA-Z0-9_.-]+)*\.(png|jpg|jpeg|svg|webp)(\?.*)?$/, {
    message: "Logo must be a secure image URL (png, jpg, jpeg, svg, webp)"
  }).optional().or(zod.z.literal("")).or(zod.z.null()),
  theme: themeSchema
});

// src/engine/css-generator.ts
function generateTenantCss(config) {
  let parsed;
  try {
    parsed = themeSchema.parse(config);
  } catch (err) {
    console.error("[ABDStyles] Invalid theme configuration provided. Falling back to Tech-Noir defaults.", err);
    parsed = {
      primary: "#06b6d4",
      // cyan-500
      secondary: "#1e293b",
      // slate-800
      rounded: true,
      radius: "0.15rem"
    };
  }
  const primaryHex = parsed.primary;
  const primaryHsl = hexToHslComponents(primaryHex);
  const primaryFgHex = getContrastColor(primaryHex);
  const primaryFgHsl = hexToHslComponents(primaryFgHex);
  let secondaryCss = "";
  if (parsed.secondary) {
    const secHex = parsed.secondary;
    const secHsl = hexToHslComponents(secHex);
    const secFgHex = getContrastColor(secHex);
    const secFgHsl = hexToHslComponents(secFgHex);
    secondaryCss = `
    --secondary: ${secHsl} !important;
    --secondary-foreground: ${secFgHsl} !important;`;
  }
  let accentCss = "";
  let accentDarkCss = "";
  if (parsed.accent) {
    const accHex = parsed.accent;
    const accHsl = hexToHslComponents(accHex);
    const accFgHex = getContrastColor(accHex);
    const accFgHsl = hexToHslComponents(accFgHex);
    accentCss = `
    --accent: ${accHsl} !important;
    --accent-foreground: ${accFgHsl} !important;`;
    const accDarkHex = adjustColor(accHex, 15);
    const accDarkHsl = hexToHslComponents(accDarkHex);
    const accDarkFgHex = getContrastColor(accDarkHex);
    const accDarkFgHsl = hexToHslComponents(accDarkFgHex);
    accentDarkCss = `
  --accent: ${accDarkHsl} !important;
  --accent-foreground: ${accDarkFgHsl} !important;`;
  }
  let bgCss = "";
  if (parsed.background) {
    const bgHex = parsed.background;
    const bgHsl = hexToHslComponents(bgHex);
    const bgFgHex = getContrastColor(bgHex);
    const bgFgHsl = hexToHslComponents(bgFgHex);
    bgCss = `
    --background: ${bgHsl} !important;
    --foreground: ${bgFgHsl} !important;`;
  }
  const primaryDarkHex = adjustColor(primaryHex, 15);
  const primaryDarkHsl = hexToHslComponents(primaryDarkHex);
  const primaryDarkFgHex = getContrastColor(primaryDarkHex);
  const primaryDarkFgHsl = hexToHslComponents(primaryDarkFgHex);
  let radiusValue = "0px";
  if (parsed.rounded) {
    radiusValue = parsed.radius || "0.75rem";
  }
  return `/* ABDStyles Dynamic Multi-Tenant Injection Gateway */
:root {
  --primary: hsl(${primaryHsl}) !important;
  --primary-foreground: hsl(${primaryFgHsl}) !important;
  --ring: hsl(${primaryHsl}) !important;
  --radius: ${radiusValue} !important;${secondaryCss ? secondaryCss.replace(/--secondary: (.*?)( !important)/g, "--secondary: hsl($1)$2").replace(/--secondary-foreground: (.*?)( !important)/g, "--secondary-foreground: hsl($1)$2") : ""}${accentCss ? accentCss.replace(/--accent: (.*?)( !important)/g, "--accent: hsl($1)$2").replace(/--accent-foreground: (.*?)( !important)/g, "--accent-foreground: hsl($1)$2") : ""}${bgCss ? bgCss.replace(/--background: (.*?)( !important)/g, "--background: hsl($1)$2").replace(/--foreground: (.*?)( !important)/g, "--foreground: hsl($1)$2") : ""}
}

.dark {
  --primary: hsl(${primaryDarkHsl}) !important;
  --primary-foreground: hsl(${primaryDarkFgHsl}) !important;
  --ring: hsl(${primaryDarkHsl}) !important;${accentDarkCss ? accentDarkCss.replace(/--accent: (.*?)( !important)/g, "--accent: hsl($1)$2").replace(/--accent-foreground: (.*?)( !important)/g, "--accent-foreground: hsl($1)$2") : ""}
}`;
}
function ThemeScript() {
  const code = `
    try {
      var match = document.cookie.match(/(?:^|; )abd_theme=([^;]*)/);
      var theme = (match && match[1]) || localStorage.getItem('theme') || 'dark';
      if (theme === 'system') {
        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.className = isDark ? 'dark' : 'light';
      } else {
        document.documentElement.className = theme;
      }
    } catch (e) {}
  `;
  return /* @__PURE__ */ jsxRuntime.jsx("script", { suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: code } });
}
function AdminPageHeader({
  icon: Icon,
  breadcrumb,
  title,
  backButton,
  description,
  children,
  className = "",
  tenantId
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("header", { className: `flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8 ${className}`, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-2 min-w-0 flex-1", children: [
      breadcrumb && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-[10px] font-mono font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2 mb-2", children: [
        Icon && /* @__PURE__ */ jsxRuntime.jsx(Icon, { size: 14, className: "text-primary animate-pulse", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "animate-console-pulse", children: breadcrumb }),
        tenantId && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-muted-foreground ml-1", children: [
          "(",
          tenantId,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-4 mt-1 min-w-0", children: /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl font-black uppercase italic tracking-tight text-foreground leading-none flex-1 truncate", children: title }) }),
      description && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground font-sans mt-2 leading-relaxed", children: description })
    ] }),
    children && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center space-x-2 shrink-0", children })
  ] });
}
function HeroHeader({
  statusText,
  title,
  description,
  className = "",
  titleClassName = "text-6xl md:text-7xl"
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("header", { className: `flex flex-col gap-6 items-center text-center ${className}`, role: "banner", children: [
    statusText && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-border text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono rounded", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "relative flex h-2 w-2", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })
      ] }),
      statusText
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("h1", { className: `${titleClassName} font-black tracking-tighter text-foreground italic uppercase antialiased leading-none`, children: title }),
    description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg text-muted-foreground max-w-[650px] font-light leading-relaxed mx-auto", children: description })
  ] });
}

exports.AdminPageHeader = AdminPageHeader;
exports.HeroHeader = HeroHeader;
exports.ThemeScript = ThemeScript;
exports.adjustColor = adjustColor;
exports.brandingSchema = brandingSchema;
exports.generateTenantCss = generateTenantCss;
exports.getContrastColor = getContrastColor;
exports.hexColorSchema = hexColorSchema;
exports.hexToHslComponents = hexToHslComponents;
exports.themeSchema = themeSchema;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map