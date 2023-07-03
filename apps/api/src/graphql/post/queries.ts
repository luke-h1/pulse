import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import builder from '../../builder';
import db from '../../db';
import decodeAccessToken from '../../lib/jwt/decodeAccessToken';
import {
  SearchArgs,
  getPostPaginationArgs,
} from '../../lib/prisma/getPaginationArgs';
import { SearchOrder } from '../user/queries';

export const Post = builder.prismaObject('Post', {
  name: 'Post',
  description: 'Post',
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    intro: t.exposeString('intro'),
    image: t.exposeString('image', {
      nullable: true,
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: t.expose('content', {
      type: 'JSON',
    }),
    author: t.relation('author'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
  }),
});

export const PostsResponse = builder.objectType('PostsResponse', {
  description: 'PostsResponse',
  fields: t => ({
    nextCursor: t.exposeString('nextCursor', {
      nullable: true,
    }),
    prevCursor: t.exposeString('prevCursor', {
      nullable: true,
    }),
    totalCount: t.exposeInt('totalCount'),
    results: t.expose('results', {
      type: [Post],
    }),
  }),
});

const PostSearchInput = builder.inputType('PostSearchInput', {
  description: 'Search posts input',
  fields: t => ({
    cursor: t.string({ required: false }),
    search: t.string(),
    order: t.field({ type: SearchOrder, required: false }),
    orderBy: t.string(),
  }),
});

builder.queryFields(t => ({
  post: t.prismaField({
    type: Post,
    description: 'Get post by id', // TODO lh - get by slug instead
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _, args) => {
      const post = await db.post.findUnique({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });

      if (!post) {
        throw new GraphQLError('Post not found');
      }

      return post;
    },
  }),
  posts: t.field({
    type: PostsResponse,
    args: {
      input: t.arg({ type: PostSearchInput }),
    },
    resolve: async (_query, args, _) => {
      const incomingCursor = args.input?.cursor;
      let results;

      const filter: Prisma.PostWhereInput | undefined = {
        OR: [
          {
            title: {
              contains: args.input?.search ?? undefined,
              mode: 'insensitive',
            },
          },
          {
            intro: {
              contains: args.input?.search ?? undefined,
              mode: 'insensitive',
            },
          },
        ],
      };

      const totalCount = await db.post.count();

      if (incomingCursor) {
        results = await db.post.findMany(
          getPostPaginationArgs(args as SearchArgs, false, filter),
        );
      }
      results = await db.post.findMany(
        getPostPaginationArgs(args as SearchArgs, true, filter),
      );

      // first 10 results
      const cursor = results[9]?.id;

      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor ?? '',
        results,
        totalCount,
      };
    },
  }),
  myPosts: t.field({
    type: PostsResponse,
    args: {
      input: t.arg({ type: PostSearchInput }),
    },
    resolve: async (_query, args, ctx) => {
      const userId = decodeAccessToken(ctx?.accessToken);

      if (!userId) {
        throw new GraphQLError('Not authenticated');
      }

      const incomingCursor = args.input?.cursor;
      let results;

      const filter: Prisma.PostWhereInput | undefined = {
        OR: [
          {
            title: {
              contains: args.input?.search ?? undefined,
              mode: 'insensitive',
            },
          },
          {
            intro: {
              contains: args.input?.search ?? undefined,
              mode: 'insensitive',
            },
          },
        ],
      };

      const totalCount = await db.post.count({
        where: {
          authorId: userId.toString(),
        },
      });

      if (incomingCursor) {
        results = await db.post.findMany(
          getPostPaginationArgs(args as SearchArgs, false, filter),
        );
      }

      results = await db.post.findMany(
        getPostPaginationArgs(args as SearchArgs, true, filter),
      );

      // first 10 results
      const cursor = results[9]?.id;
      return {
        prevCursor: args?.input?.cursor ?? '',
        nextCursor: cursor ?? '',
        results,
        totalCount,
      };
    },
  }),
}));
