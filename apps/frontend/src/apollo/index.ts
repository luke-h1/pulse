import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { getAuthToken } from '@frontend/lib/getAuthToken';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { isServer } from '@common/hooks';

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

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer,
    connectToDevTools: true,
    link: from([
      errorLink,
      authLink,
      createHttpLink({
        uri: process.env.NEXT_PUBLIC_PULSE_API_URL,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {},
    }),
  });
}

// eslint-disable-next-line consistent-return
export function initializeApollo(initialState?: unknown) {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });
    _apolloClient.cache.restore(data);

    if (isServer) {
      return _apolloClient;
    }

    if (!apolloClient) {
      apolloClient = _apolloClient;
    }

    return _apolloClient;
  }
  // potential bug here.
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: Record<string, unknown> & { props?: Record<string, unknown> },
) {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
