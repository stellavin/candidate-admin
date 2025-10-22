import { ReactNode } from 'react';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib';

interface ApolloProviderProps {
  children: ReactNode;
}

/**
 * Apollo Client Provider wrapper component.
 * Provides GraphQL client context to the entire application.
 * @param {ApolloProviderProps} props - Component props
 * @returns {JSX.Element} Apollo provider with configured client
 */
export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
}

