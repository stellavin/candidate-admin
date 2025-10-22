import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

/**
 * Design tokens for consistent theming across the application.
 * Follows mobile-first approach with responsive breakpoints.
 */
export const tokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 20px rgba(0,0,0,0.15)',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  layout: {
    drawerWidth: 220,
    headerHeight: {
      mobile: 56,
      desktop: 64,
    },
    containerMaxWidth: 1440,
  },
  sidebar: {
    background: '#D5D0FE',
    brandText: '#5B21B6',
    navItem: {
      padding: '12px 16px',
      minHeight: '48px',
      borderRadius: '8px',
      margin: '0 0 4px',
    },
    active: {
      background: 'rgba(91, 33, 182, 0.12)',
      borderLeft: '4px solid #5B21B6',
      textColor: '#5B21B6',
    },
    hover: {
      background: 'rgba(91, 33, 182, 0.08)',
      borderLeft: '2px solid rgba(91, 33, 182, 0.3)',
    },
    icon: {
      size: '24px',
      fontSize: '20px',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '0.875rem',
      fontWeight: {
        normal: 500,
        active: 600,
      },
    },
  },
  cssVars: {
    sidebar: {
      '--sidebar-background': '#D5D0FE',
      '--sidebar-brand-text': '#5B21B6',
      '--sidebar-nav-padding': '12px 16px',
      '--sidebar-nav-min-height': '48px',
      '--sidebar-nav-border-radius': '8px',
      '--sidebar-nav-margin': '0 0 4px',
      '--sidebar-active-background': 'rgba(91, 33, 182, 0.12)',
      '--sidebar-active-border-left': '4px solid #5B21B6',
      '--sidebar-active-text-color': '#5B21B6',
      '--sidebar-hover-background': 'rgba(91, 33, 182, 0.08)',
      '--sidebar-hover-border-left': '2px solid rgba(91, 33, 182, 0.3)',
      '--sidebar-icon-size': '24px',
      '--sidebar-icon-font-size': '20px',
      '--sidebar-font-family': '"Inter", "Roboto", -apple-system, BlinkMacSystemFont, sans-serif',
      '--sidebar-font-size': '0.875rem',
      '--sidebar-font-weight-normal': '500',
      '--sidebar-font-weight-active': '600',
    },
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
} as const;

/**
 * Applies CSS custom properties to the document root element.
 * Should be called once during application initialization.
 */
export const applyThemeVars = () => {
  const root = document.documentElement;
  Object.entries(tokens.cssVars.sidebar).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

/**
 * Creates and returns a Material-UI theme based on the provided palette mode.
 * @param {PaletteMode} mode - The theme mode ('light' or 'dark')
 * @returns {Theme} Configured Material-UI theme
 */
export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#5B21B6',
      light: '#7C3AED',
      dark: '#4C1D95',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: tokens.borderRadius.sm,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.3,
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
        fullWidth: true,
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 44,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1, 1.5),
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(1.5, 2),
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: tokens.shadows.sm,
          minHeight: tokens.layout.headerHeight.mobile,
          [theme.breakpoints.up('md')]: {
            minHeight: tokens.layout.headerHeight.desktop,
          },
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: `${tokens.layout.headerHeight.mobile}px !important`,
          [theme.breakpoints.up('md')]: {
            minHeight: `${tokens.layout.headerHeight.desktop}px !important`,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(1),
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
        }),
      },
    },
  },
});

