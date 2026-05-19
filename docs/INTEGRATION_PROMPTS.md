# Prompts & Integration Guide for Sibling Applications

This guide provides **ready-to-use, copy-pasteable prompts** designed to instruct other AI coding agents (or developers) to seamlessly integrate the `@abd/styles` central engine into any sibling application inside the ABD SaaS suite.

---

## 🛰️ Prompt 1: Satelite UI Theme & Components Integration (e.g. for `ABDQuiz`, `ABDAuth`, `ABDtenantGobernance`, etc.)

Copy and paste this prompt when instructing an agent working on a satellite application to connect its layout and visual chassis to the central `@abd/styles` library:

```markdown
# ESPECIFICACIÓN: Integración del Chasis Visual y Componentes Compartidos (@abd/styles)

Estamos integrando el sistema central de marca blanca y chasis visual `@abd/styles` en esta aplicación para unificar la hoja de estilos global, eliminar la duplicación de código en la navegación y permitir que la interfaz mute según el Tenant activo en tiempo real.

## REQUERIMIENTOS TÉCNICOS:

1. **Instalación de Dependencia**:
   - Agrega la dependencia central de GitHub en el `package.json` de este proyecto:
     ```json
     "@abd/styles": "git+https://github.com/ajabadia/ABDStyles.git#main"
     ```
   - Ejecuta `npm install --legacy-peer-deps` (para evitar conflictos de pares de React 19 con Lucide Icons).

2. **Unificación de la Hoja de Estilos (`globals.css`)**:
   - Limpia tu archivo `globals.css` eliminando declaraciones locales duplicadas (variables HSL base, scrollbars, clases de botones de consola como `.btn-primary-console` o `.btn-skip-console`, y utilidades de fondo como `.bg-industrial-grid`, `.mask-industrial-fade`, `.glass-panel` y `.bg-grain`).
   - Importa la hoja de estilos centralizada directamente. Si utilizas Next.js 16 con Turbopack, la resolución de subpaths puede fallar, por lo que es preferible utilizar la ruta relativa directa a `node_modules`:
     ```css
     @import "tailwindcss";
     @import "../../node_modules/@abd/styles/dist/styles/industrial-core.css";
     ```
   - **Mapeo Obligatorio para Tailwind v4**: Declara las variables de mapeo en el bloque `@theme inline` para asociar las propiedades HSL del core con las utilidades de color estándar de Tailwind:
     ```css
     @theme inline {
       --radius-xl: calc(var(--radius) + 1px);
       --radius-lg: var(--radius);
       --radius-md: calc(var(--radius) - 1px);
       --radius-sm: calc(var(--radius) - 2px);

       --color-background: hsl(var(--background));
       --color-foreground: hsl(var(--foreground));
       --color-primary: hsl(var(--primary));
       --color-primary-foreground: hsl(var(--primary-foreground));
       --color-secondary: hsl(var(--secondary));
       --color-secondary-foreground: hsl(var(--secondary-foreground));
       --color-card: hsl(var(--card));
       --color-card-foreground: hsl(var(--card-foreground));
       --color-popover: hsl(var(--popover));
       --color-popover-foreground: hsl(var(--popover-foreground));
       --color-muted: hsl(var(--muted));
       --color-muted-foreground: hsl(var(--muted-foreground));
       --color-accent: hsl(var(--accent));
       --color-accent-foreground: hsl(var(--accent-foreground));
       --color-destructive: hsl(var(--destructive));
       --color-destructive-foreground: hsl(var(--destructive-foreground));
       --color-border: hsl(var(--border));
       --color-input: hsl(var(--input));
       --color-ring: hsl(var(--ring));
     }
     ```

3. **Inyección en Servidor (SSR) en el Layout Raíz**:
   - En `src/app/[locale]/layout.tsx` (o tu layout raíz), importa la función generadora:
     ```typescript
     import { generateTenantCss } from '@abd/styles';
     ```
   - Recupera los datos de branding del Tenant activo (ya sea de la base de datos de configuración por subdominio o desde la sesión de usuario federada).
   - Ejecuta `generateTenantCss(tenant.branding.theme)` en el servidor (en memoria) para obtener el bloque CSS optimizado.
   - Inyecta la cadena CSS resultante dentro del `<head>` del HTML utilizando una etiqueta `<style>` con el ID `tenant-branding-gateway`:
     ```tsx
     <head>
       {customCss && (
         <style id="tenant-branding-gateway" dangerouslySetInnerHTML={{ __html: customCss }} />
       )}
     </head>
     ```

4. **Consumo de Componentes React Reutilizables (Patrón Client Wrapper)**:
   - Dado que los componentes de navegación dependen de callbacks de enrutamiento y hooks del lado del cliente (`useTheme`, `useLocale`, `useSession`), no deben instanciarse directamente dentro de Server Components (como el layout raíz).
   - **Mejor Práctica**: Mantén un wrapper cliente local (`"use client"`) en tu proyecto satélite (ej. `src/components/ui/SystemSettings.tsx` y `src/components/TacticalSidebar.tsx`) que envuelva a los componentes importados de `@abd/styles` e inyecte los hooks y traducción locales de forma segura:
     ```typescript
     // src/components/ui/SystemSettings.tsx
     "use client";

     import { useTheme } from "next-themes";
     import { useLocale, useTranslations } from "next-intl";
     import { usePathname, useRouter } from "@/i18n/routing";
     import { useSession, signIn, signOut } from "next-auth/react";
     import { SystemSettings as SharedSystemSettings } from '@abd/styles';

     export function SystemSettings() {
       const t = useTranslations("settings");
       const { theme, setTheme } = useTheme();
       const { status } = useSession();
       const locale = useLocale();
       const router = useRouter();
       const pathname = usePathname();

       return (
         <SharedSystemSettings
           locale={locale}
           onLocaleChange={(loc) => router.replace(pathname, { locale: loc })}
           theme={theme}
           onThemeChange={setTheme}
           translations={{
             title: t("title"),
             close: t("close"),
             language: t("language"),
             theme: t("theme"),
             // Ojo con el mapeo si tu JSON usa claves snake_case:
             themeLight: t("theme_light"),
             themeDark: t("theme_dark"),
             themeSystem: t("theme_system"),
             logout: t("logout"),
             login: t("login"),
           }}
           isAuthenticated={status === "authenticated"}
           onLogout={() => signOut({ callbackUrl: "/" })}
         />
       );
     }
     ```
     De este modo, tu layout de servidor puede instanciar el componente local wrapper de manera limpia sin romper los flujos de renderizado.

5. **Alineación con Clases Semánticas**:
   - Asegúrate de que las vistas y componentes utilicen las clases semánticas unificadas (ej: `.btn-primary-console`, `.btn-secondary-console`, `.btn-skip-console`, `.btn-destructive-console`, `.input-console`, `.console-breadcrumb`, `.console-status-dot`) y las variables del tema de Tailwind v4 en lugar de colores fijos.

6. **Verificación**:
   - Levanta el servidor local (`npm run dev`) y simula subdominios accediendo a `http://bomberos.lvh.me:3300` o `http://policia.lvh.me:3300` para comprobar que la interfaz muta de color instantáneamente sin parpadeos visuales en la recarga y que los componentes de navegación funcionan idénticamente.
```

---

## 🏛️ Prompt 2: Branding Customizer Console Integration (for `ABDAuth` / `ABDGovernance`)

Copy and paste this prompt when instructing an agent working on `ABDAuth` or `ABDGovernance` to build the administration portal where tenants configure their styles:

```markdown
# ESPECIFICACIÓN: Consola de Personalización Dinámica Multi-Tenant (Branding Customizer Console)

Estamos construyendo un panel administrativo dentro del portal de gobernanza para permitir a los administradores de cada Tenant (academia/empresa) personalizar de forma segura su identidad visual (logotipo, colores corporativos y redondeado de esquinas).

## REQUERIMIENTOS TÉCNICOS:

1. **Esquema de Base de Datos (MongoDB)**:
   - Modifica o extiende el modelo de datos de `Tenant` para incorporar el objeto `branding` estructurado de acuerdo con `@abd/styles`:
     ```typescript
     branding: {
       logoUrl: string; // URL CDN de la imagen
       theme: {
         primary: string; // Hexadecimal (ej: '#ef4444')
         secondary: string; // Hexadecimal (ej: '#1f2937')
         background: string; // Hexadecimal (ej: '#0b0f19')
         rounded: boolean; // Si aplica bordes redondeados
         radius: string; // Valor CSS del redondeado (ej: '0.75rem')
       }
     }
     ```

2. **Sanitización Estricta mediante Zod**:
   - Instala e importa `@abd/styles` para reutilizar su esquema de validación `brandingSchema` en el backend antes de persistir cualquier cambio en la base de datos, evitando inyecciones de CSS maliciosas.

3. **UI del Formulario de Marca (`TenantBrandingForm.tsx`)**:
   - Diseña un panel de control premium (estética Tech-Noir minimalista, bordes industriales, fondos glassmorphism).
   - Proporciona selectores de color interactivos (`<input type="color">`) para los campos Primario, Secundario y Fondo.
   - Implementa un control de tipo Toggle o Slider para activar/desactivar el redondeado y definir el valor del radio.
   - Añade un área de carga de imágenes (Drag & Drop) para el logotipo corporativo.

4. **Persistencia de Media con Vercel Blob Storage**:
   - Cuando el administrador suba una imagen de logotipo, no la guardes localmente.
   - Sube la imagen a **Vercel Blob Storage** (`@vercel/blob`) y recupera su URL pública de CDN (https://xxxx.public.blob.vercel-storage.com/logos/...) para guardarla en el campo `branding.logoUrl` del Tenant.

5. **Previsualizador Visual en Tiempo Real (Live Preview Box)**:
   - Crea un cuadro lateral de simulación interactiva que muestre una mini-vista simulada de la aplicación satélite.
   - Utiliza estados locales de React (`useState`) enlazados a los inputs del formulario para inyectar dinámicamente variables CSS inline sobre este cuadro simulado, de modo que el usuario vea cómo cambia el diseño al arrastrar o cambiar los selectores de color antes de pulsar "Guardar".

6. **Server Actions de Guardado**:
   - Implementa una Server Action segura con validación de roles de administrador de Tenant para actualizar la configuración de branding en MongoDB y limpiar cualquier caché activa.
```
