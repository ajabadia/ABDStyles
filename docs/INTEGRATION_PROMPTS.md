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
   - Importa la hoja de estilos centralizada directamente:
     ```css
     @import "tailwindcss";
     @import "@abd/styles/dist/styles/industrial-core.css";
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

4. **Consumo de Componentes React Reutilizables**:
   - Reemplaza los componentes locales redundantes `TacticalSidebar` y `SystemSettings` importando las versiones unificadas de la librería:
     ```typescript
     import { TacticalSidebar, SystemSettings } from '@abd/styles';
     ```
   - **TacticalSidebar**: Pásale la lista dinámica de enlaces (`links`), los datos de sesión del usuario (`user`), la función de logout local y el componente Link nativo de tu framework de enrutamiento (ej. `Link` de `@/i18n/routing` o `next/link`):
     ```tsx
     import Link from "@/i18n/routing"; // O el link correspondiente

     <TacticalSidebar
       user={{ name: session.user.name, role: session.user.role, tenantId: session.user.tenantId, email: session.user.email }}
       links={[
         { href: "/dashboard", label: t("overview"), icon: <LayoutDashboard size={14} /> },
         // ... otros enlaces
       ]}
       logoUrl={tenant?.branding?.logoUrl}
       LinkComponent={Link}
       onLogout={() => signOut({ callbackUrl: "/" })}
     />
     ```
   - **SystemSettings**: Pásale las traducciones locales calculadas por `next-intl` (evitando importaciones directas en el componente) y el callback para delegar los cambios de idioma y tema (soportando `next-themes` o cambio autónomo):
     ```tsx
     import { useTheme } from "next-themes";
     const { theme, setTheme } = useTheme();

     <SystemSettings
       locale={locale}
       onLocaleChange={(loc) => router.replace(pathname, { locale: loc })}
       theme={theme}
       onThemeChange={setTheme}
       translations={{
         title: t("settings.title"),
         close: t("settings.close"),
         language: t("settings.language"),
         theme: t("settings.theme"),
         themeLight: t("settings.theme_light"),
         themeDark: t("settings.theme_dark"),
         themeSystem: t("settings.theme_system"),
         logout: t("settings.logout"),
       }}
       isAuthenticated={status === "authenticated"}
       onLogout={() => signOut({ callbackUrl: "/" })}
     />
     ```

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
