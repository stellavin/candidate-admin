import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { env } from './env';
import { logger } from './logger';

/**
 * Apollo Client error link for logging GraphQL and network errors.
 */
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

/**
 * Apollo Client authentication link that adds API key to requests.
 */
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-api-key': env.graphqlApiKey,
    },
  });
  return forward(operation);
});

/**
 * Apollo Client HTTP link for GraphQL endpoint.
 */
const httpLink = new HttpLink({
  uri: env.graphqlEndpoint,
});

/**
 * Configured Apollo Client instance for GraphQL operations.
 * Includes error handling, authentication, and caching policies.
 */
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listCandidates: {
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

