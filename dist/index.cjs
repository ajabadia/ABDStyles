'use strict';

var zod = require('zod');
var react = require('react');
var lucideReact = require('lucide-react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
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
  --primary: ${primaryHsl} !important;
  --primary-foreground: ${primaryFgHsl} !important;
  --ring: ${primaryHsl} !important;
  --radius: ${radiusValue} !important;${secondaryCss}${accentCss}${bgCss}
}

.dark {
  --primary: ${primaryDarkHsl} !important;
  --primary-foreground: ${primaryDarkFgHsl} !important;
  --ring: ${primaryDarkHsl} !important;${accentDarkCss}
}`;
}
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var defaultTranslations = {
  brandFallback: "ABD SYSTEM",
  logoutBtn: "TERMINAR SESI\xD3N",
  identityProvider: "IDENTITY PROVIDER",
  statusOnline: "ONLINE",
  emailLabel: "EMAIL"
};
function TacticalSidebar({
  user,
  links,
  logoUrl,
  onLogout,
  brandName,
  LinkComponent,
  translations,
  activeHref,
  homeHref = "/dashboard",
  menuAriaLabel = "Toggle Tactical Menu"
}) {
  const [isOpen, setIsOpen] = react.useState(false);
  react.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
  const t = { ...defaultTranslations, ...translations };
  const Link = LinkComponent || (({ href, children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("a", { href, ...props, children }));
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        "aria-label": menuAriaLabel,
        "aria-expanded": isOpen,
        "aria-controls": "tactical-sidebar-panel",
        onClick: () => setIsOpen(!isOpen),
        className: cn(
          "fixed top-6 left-6 p-3 rounded-none bg-background/80 backdrop-blur-md shadow-lg border border-border hover:border-primary/40 hover:bg-muted transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-1 focus:ring-primary/40",
          isOpen ? "z-[55]" : "z-40"
        ),
        children: isOpen ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "w-5 h-5 text-primary" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Menu, { className: "w-5 h-5 text-foreground" })
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "aria-hidden": "true",
        onClick: () => setIsOpen(false),
        className: "fixed inset-0 z-[45] bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      "aside",
      {
        id: "tactical-sidebar-panel",
        role: "navigation",
        "aria-label": "Tactical Navigation",
        className: cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out transform rounded-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between items-center mb-8 pt-12 border-b border-border pb-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              Link,
              {
                href: homeHref,
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3",
                children: [
                  logoUrl ? /* @__PURE__ */ jsxRuntime.jsx(
                    "img",
                    {
                      src: logoUrl,
                      alt: "Logo",
                      className: "w-6 h-6 object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                    }
                  ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Shield, { size: 12, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground", children: user.tenantId || brandName || t.brandFallback })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                "aria-label": "Close navigation",
                onClick: () => setIsOpen(false),
                className: "p-1.5 hover:bg-muted border border-border rounded-none text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "flex-1 flex flex-col gap-2 overflow-y-auto", children: links.map((link) => {
            const isActive = activeHref ? activeHref === link.href || link.href !== homeHref && activeHref.startsWith(link.href) : false;
            return /* @__PURE__ */ jsxRuntime.jsxs(
              Link,
              {
                href: link.href,
                onClick: () => setIsOpen(false),
                className: cn(
                  "px-4 py-3 rounded-none flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border",
                  isActive ? "bg-primary/10 border-primary text-primary" : "bg-muted/10 border-border text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: link.icon }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 truncate", children: link.label })
                ]
              },
              link.href
            );
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-t border-border pt-6 mt-auto", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-4 p-4 border border-border bg-muted/10 rounded-none relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary rounded-none", children: user.name?.charAt(0).toUpperCase() || "U" }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs font-black tracking-wider truncate uppercase text-foreground", children: user.name }),
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "font-mono text-[8px] text-muted-foreground/80 uppercase tracking-widest truncate", children: user.role })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "font-mono text-[8px] text-muted-foreground/60 flex flex-col gap-1 border-t border-border/50 pt-2.5", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  t.identityProvider,
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-primary font-bold", children: t.statusOnline })
              ] }),
              user.email && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  t.emailLabel,
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate max-w-[150px]", children: user.email.toLowerCase() })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              "button",
              {
                "aria-label": t.logoutBtn,
                onClick: onLogout,
                className: "w-full flex items-center justify-center gap-2 px-3 py-2 border border-border text-[9px] font-mono font-black uppercase tracking-widest transition-all rounded-none hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LogOut, { size: 12 }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: t.logoutBtn })
                ]
              }
            )
          ] }) })
        ]
      }
    )
  ] });
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
  if (typeof window !== "undefined") {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx("script", { suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: code } });
}
function Footer({
  className = "",
  label,
  telemetryItems,
  showSeparator = true,
  separatorWidth = "full",
  opacity = 30
}) {
  const opacityClass = opacity <= 20 ? "text-muted-foreground/20" : opacity >= 40 ? "text-muted-foreground/40" : "text-muted-foreground/30";
  const separatorWidthClass = separatorWidth === "short" ? "w-24 mx-auto" : "w-full";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "footer",
    {
      className: `mt-auto pt-12 flex flex-col items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] ${opacityClass} ${className}`,
      role: "contentinfo",
      children: [
        showSeparator && /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: `h-[1px] bg-border/40 ${separatorWidthClass}`,
            "aria-hidden": "true"
          }
        ),
        telemetryItems && telemetryItems.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap justify-center gap-x-12 gap-y-2", children: telemetryItems.map((item, index) => /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          item.label,
          ": ",
          item.value
        ] }, index)) }) : label && /* @__PURE__ */ jsxRuntime.jsx("span", { children: label })
      ]
    }
  );
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
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4 mt-1 min-w-0", children: [
        backButton,
        /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl font-black uppercase italic tracking-tight text-foreground leading-none flex-1 truncate", children: title })
      ] }),
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
exports.Footer = Footer;
exports.HeroHeader = HeroHeader;
exports.TacticalSidebar = TacticalSidebar;
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