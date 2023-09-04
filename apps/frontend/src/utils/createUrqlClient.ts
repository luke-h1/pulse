import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import { NextPageContext } from 'next';
import Router from 'next/router';
import { Exchange, ClientOptions, SSRExchange, dedupExchange } from 'urql';
import { pipe, tap } from 'wonka';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { isServer } from '@common/hooks';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from '@graphql-hooks/generated';
import getConfig from 'next/config';
import CustomUpdateQuery from './customUpdateQuery';

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
  let cookie: string | undefined = '';
  const { publicRuntimeConfig } = getConfig();

  if (isServer) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.PUBLIC_PULSE_API_URL,
    fetchOptions: {
      credentials: 'include',
      headers: cookie ? { cookie } : undefined,
    },
    requestPolicy: 'cache-and-network',
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {
            login: (result, args, cache) => {
              CustomUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                result,
                // eslint-disable-next-line @typescript-eslint/no-shadow
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  }
                  return {
                    me: result.login.user,
                  };
                },
              );
            },
            logout: (result, args, cache) => {
              CustomUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                result,
                () => ({ me: null }),
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      multipartFetchExchange,
      dedupExchange,
    ],
  };
};
