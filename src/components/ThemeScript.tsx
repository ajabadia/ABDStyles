import React from 'react';

/**
 * 🌓 ThemeScript: Centralized client-side theme initialization
 * Safely loads the user's preferred theme from localStorage prior to full rendering,
 * preventing flash of unstyled content (FOUC).
 */
export function ThemeScript() {
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

  // Only render on the server to prevent React 19 client warning
  if (typeof window !== 'undefined') {
    return null;
  }

  return (
    <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: code }} />
  );
}
