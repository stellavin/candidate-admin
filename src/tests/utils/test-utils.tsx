import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../../styles/theme';

/**
 * Light theme instance for testing components
 */
const testTheme = getTheme('light');

/**
 * Props for the AllTheProviders wrapper component
 */
interface AllTheProvidersProps {
  children: React.ReactNode;
  mocks?: readonly MockedResponse[];
}

/**
 * Wrapper component that provides all necessary providers for testing
 * @param props - Component props including children and Apollo mocks
 * @returns Wrapped children with all providers
 */
function AllTheProviders({ children, mocks = [] }: AllTheProvidersProps) {
  return (
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={testTheme}>
        {children}
      </ThemeProvider>
    </MockedProvider>
  );
}

/**
 * Custom render options that include Apollo mocks
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  mocks?: readonly MockedResponse[];
}

/**
 * Custom render function that wraps components with providers
 * @param ui - React element to render
 * @param options - Custom render options including Apollo mocks
 * @returns Render result with user event setup
 */
function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { mocks, ...renderOptions } = options || {};
  
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => (
        <AllTheProviders mocks={mocks}>{children}</AllTheProviders>
      ),
      ...renderOptions,
    }),
  };
}

export * from '@testing-library/react';
export { customRender as render };

