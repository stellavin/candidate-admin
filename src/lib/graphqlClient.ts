import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { env } from './env';
import { logger } from './logger';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      logger.error('GraphQL Error', undefined, {
        message,
        locations,
        path,
        extensions,
        operation: operation.operationName,
      });
    });
  }

  if (networkError) {
    logger.error('Network Error', networkError, {
      operation: operation.operationName,
    });
  }
});

// Authentication link
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-api-key': env.graphqlApiKey,
    },
  });
  return forward(operation);
});

// HTTP link
const httpLink = new HttpLink({
  uri: env.graphqlEndpoint,
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listCandidates: {
            // Don't cache by default to always get fresh data
            keyArgs: ['firstName', 'lastName'],
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

