// globalStyles.ts
// Base compartida de VToConnect - Convertida a TypeScript

export interface ThemeColors {
  bgApp: string;
  white: string;
  textMain: string;
  textMuted: string;
  primaryCoral: string;
  tagGreen: string;
  borderColor: string;
  placeholderBg: string;
}

export interface ThemeTypography {
  fontFamily: string;
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
}

export const theme: Theme = {
  colors: {
    bgApp: '#FAFAF7',
    white: '#FFFFFF',
    textMain: '#222222',
    textMuted: '#555555',
    primaryCoral: '#D67C6B',
    tagGreen: '#90A288',
    borderColor: '#E2E2E2',
    placeholderBg: '#D9D9D9',
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
};

/**
 * Utilidades de layout compartidas.
 * Equivalen a las reglas de `.mobile-frame`, `.mobile-app-container`, etc.
 */
export const layout = {
  maxMobileWidth: 400,
  mobileContainer: {
    width: '100%',
    maxWidth: '400px',
    marginInline: 'auto',
    position: 'relative',
    overflow: 'hidden',
  },
} as const;

/**
 * Selectores de contenedor móvil que compartían la misma regla en el CSS original.
 */
export const MOBILE_CONTAINER_SELECTORS = [
  '.mobile-frame',
  '.mobile-app-container',
  '.mobile-container',
  '.mobile-app',
  '.mobile-screen',
  '.app-container',
] as const;

export type MobileContainerSelector = (typeof MOBILE_CONTAINER_SELECTORS)[number];

/**
 * Box-sizing global (equivale a `*, *::before, *::after { box-sizing: border-box; }`).
 */
export const globalBoxSizing = {
  selector: '*, *::before, *::after',
  boxSizing: 'border-box',
} as const;

/**
 * Reset global de márgenes/paddings y fuente.
 */
export const globalReset = {
  margin: 0,
  padding: 0,
  fontFamily: 'var(--font-family)',
} as const;

/**
 * Estilos base del body.
 */
export const bodyStyles = {
  minHeight: '100vh',
} as const;

/**
 * Genera las variables CSS (`:root`) a partir del tema tipado.
 * Útil si necesitas inyectar el tema dinámicamente en el DOM.
 */
export function buildCssVariables(t: Theme = theme): string {
  return `:root {
  --bg-app: ${t.colors.bgApp};
  --white: ${t.colors.white};
  --text-main: ${t.colors.textMain};
  --text-muted: ${t.colors.textMuted};
  --primary-coral: ${t.colors.primaryCoral};
  --tag-green: ${t.colors.tagGreen};
  --border-color: ${t.colors.borderColor};
  --placeholder-bg: ${t.colors.placeholderBg};
  --font-family: ${t.typography.fontFamily};
}`;
}