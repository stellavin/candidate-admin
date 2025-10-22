import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline, GlobalStyles, PaletteMode } from '@mui/material';
import { getTheme } from '@/styles/theme';
import { safeStorage } from '@/lib/safeStorage';

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

/**
 * Hook to access theme mode and toggle function.
 * @returns {ThemeContextType} Theme mode and toggle function
 */
export const useThemeMode = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme provider component that manages light/dark mode.
 * Persists theme preference to localStorage and applies Material-UI theme.
 * @param {ThemeProviderProps} props - Component props
 * @returns {JSX.Element} Theme provider with MUI theme
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const stored = safeStorage.getItem('themeMode');
    return (stored === 'dark' || stored === 'light') ? stored : 'light';
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      safeStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  const contextValue = useMemo(() => ({
    mode,
    toggleColorMode,
  }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              scrollBehavior: 'smooth',
            },
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '*::-webkit-scrollbar-track': {
              background: mode === 'light' ? '#f1f1f1' : '#2b2b2b',
            },
            '*::-webkit-scrollbar-thumb': {
              background: mode === 'light' ? '#888' : '#555',
              borderRadius: '4px',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              background: mode === 'light' ? '#555' : '#777',
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

