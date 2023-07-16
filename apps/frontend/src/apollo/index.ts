import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import {
  ApolloClient,
  createHttpLink,
  FieldPolicy,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { getAuthToken } from '@frontend/lib/getAuthToken';

import type {
  KeyArgsFunction,
  KeySpecifier,
} from '@apollo/client/cache/inmemory/policies';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // eslint-disable-next-line no-console
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken();

  return {
    headers: {
      ...headers,
      Authorization: token ?? headers?.Authorization,
    },
  };
});
