import { z } from 'zod';
/**
 * Zod validation schema for individual color hex codes.
 * Ensures the color is a valid 6-character hex code starting with a hash.
 * This is crucial for preventing CSS injection in custom style tags.
 */
export declare const hexColorSchema: z.ZodString;
/**
 * Zod validation schema for theme configurations.
 */
export declare const themeSchema: z.ZodObject<{
    primary: z.ZodString;
    secondary: z.ZodOptional<z.ZodString>;
    accent: z.ZodOptional<z.ZodString>;
    background: z.ZodOptional<z.ZodString>;
    rounded: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    radius: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    primary: string;
    rounded: boolean;
    secondary?: string | undefined;
    accent?: string | undefined;
    background?: string | undefined;
    radius?: string | undefined;
}, {
    primary: string;
    secondary?: string | undefined;
    accent?: string | undefined;
    background?: string | undefined;
    rounded?: boolean | undefined;
    radius?: string | undefined;
}>;
/**
 * Zod validation schema for complete tenant branding models.
 */
export declare const brandingSchema: z.ZodObject<{
    logoUrl: z.ZodUnion<[z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>, z.ZodNull]>;
    theme: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodOptional<z.ZodString>;
        accent: z.ZodOptional<z.ZodString>;
        background: z.ZodOptional<z.ZodString>;
        rounded: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        radius: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        rounded: boolean;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        radius?: string | undefined;
    }, {
        primary: string;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        rounded?: boolean | undefined;
        radius?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    theme: {
        primary: string;
        rounded: boolean;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        radius?: string | undefined;
    };
    logoUrl?: string | null | undefined;
}, {
    theme: {
        primary: string;
        secondary?: string | undefined;
        accent?: string | undefined;
        background?: string | undefined;
        rounded?: boolean | undefined;
        radius?: string | undefined;
    };
    logoUrl?: string | null | undefined;
}>;
export type TenantThemeConfig = z.infer<typeof themeSchema>;
export type TenantBrandingConfig = z.infer<typeof brandingSchema>;
//# sourceMappingURL=branding-schema.d.ts.map