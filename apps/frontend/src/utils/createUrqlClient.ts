import { getAuthToken } from '@frontend/lib/getAuthToken';
import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import { NextPageContext } from 'next';
import Router from 'next/router';
import { Exchange, ClientOptions, SSRExchange, dedupExchange } from 'urql';
import { pipe, tap } from 'wonka';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

const errorExchange: Exchange =
  ({ forward }) =>
  ops$ => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED') {
          Router.push('/auth/login');
        }
      }),
    );
  };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function invalidateAllCacheItems(cache: Cache, item: string) {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter(info => info.fieldName === item);
  fieldInfos.forEach(fi => {
    cache.invalidate('Query', item, fi.arguments || {});
  });
}

export const createUrqlClient = (
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ssrExchange: SSRExchange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ctx?: NextPageContext,
): ClientOptions => {
  const authToken = getAuthToken();

  return {
    url: process.env.NEXT_PUBLIC_PULSE_API_URL,
    fetchOptions: {
      credentials: 'include',
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
    requestPolicy: 'cache-and-network',
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {},
        },
      }),
      errorExchange,
      ssrExchange,
      multipartFetchExchange,
      dedupExchange,
    ],
  };
};