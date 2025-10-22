import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ApolloProvider } from '@/app/providers/ApolloProvider';
import { AppRoutes } from '@/app/routes';

/**
 * Root application component.
 * Wraps the application with necessary providers: error boundary, theme, Apollo, and routing.
 * @returns {JSX.Element} Fully configured application
 */
export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ApolloProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

