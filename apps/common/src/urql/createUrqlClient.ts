import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import { NextPageContext } from 'next';
import Router from 'next/router';
import { Exchange, ClientOptions, SSRExchange, dedupExchange } from 'urql';
import { pipe, tap } from 'wonka';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import isServer from '@common/hooks/isServer';
import {
  DeletePostMutationVariables,
  DeleteProjectMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  UpdatePostMutationVariables,
  UpdateProjectMutationVariables,
} from '@graphql-hooks/generated';
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

        if (error) {
          // eslint-disable-next-line no-console
          console.error('Error: ', error);
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

function invalidateCacheItem(cache: Cache, item: string, id: string) {
  try {
    cache.invalidate({
      __typename: item,
      id,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to invalidate cache item with id: ', id);
  }
}

export const createUrqlClient = (
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ssrExchange: SSRExchange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ctx?: NextPageContext,
): ClientOptions => {
  let cookie: string | undefined = '';

  if (isServer) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.PUBLIC_PULSE_API_URL as string,
    fetchOptions: {
      credentials: 'include',
      headers: cookie ? { cookie } : undefined,
    },
    requestPolicy: 'cache-and-network',
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {
            register: (result, _args, cache) => {
              CustomUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                result,
                // eslint-disable-next-line @typescript-eslint/no-shadow
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  }
                  return {
                    me: result.register.user,
                  };
                },
              );
            },
            login: (result, _args, cache) => {
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
            logout: (result, _args, cache) => {
              CustomUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                result,
                () => ({ me: null }),
              );
            },
            /* posts */
            createPost: (_result, _args, cache) => {
              invalidateAllCacheItems(cache, 'Post');
            },
            updatePost: (_result, args, cache) => {
              invalidateCacheItem(
                cache,
                'Post',
                args.id as UpdatePostMutationVariables['id'],
              );
            },
            deletePost: (_result, args, cache) => {
              invalidateCacheItem(
                cache,
                'Post',
                args.id as DeletePostMutationVariables['id'],
              );
            },
            /* projects */
            createProject: (_result, _args, cache) => {
              invalidateAllCacheItems(cache, 'Project');
            },
            updateProject: (_result, args, cache) => {
              invalidateCacheItem(
                cache,
                'Project',
                args.id as UpdateProjectMutationVariables['id'],
              );
            },
            deleteProject: (_result, args, cache) => {
              invalidateCacheItem(
                cache,
                'Project',
                args.id as DeleteProjectMutationVariables['id'],
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
