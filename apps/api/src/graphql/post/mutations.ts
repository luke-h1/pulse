import { GraphQLError } from 'graphql';
import builder from '../../builder';
import db from '../../db';
import decodeAccessToken from '../../lib/jwt/decodeAccessToken';

const PostInput = builder.inputType('CreatePostInput', {
  description: 'Create new post',
  fields: t => ({
    title: t.string({ required: true }),
    intro: t.string({ required: true }),
    image: t.string({ required: false }),
    content: t.field({
      required: true,
      type: 'JSON',
    }),
  }),
});

builder.mutationFields(t => ({
  createPost: t.prismaField({
    type: 'Post',
    description: 'Create new post',
    args: {
      input: t.arg({ type: PostInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);

      if (!userId) {
        throw new GraphQLError('Unauthorized');
      }

      return db.post.create({
        ...query,
        data: {
          ...args.input,
          authorId: userId.toString(),
        },
      });
    },
  }),
  updatePost: t.prismaField({
    type: 'Post',
    description: 'Update post',
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: PostInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);

      if (!userId) {
        throw new GraphQLError('Unauthorized');
      }

      const post = await db.post.findUnique({
        where: {
          id: args.id,
        },
      });

      if (post?.authorId !== userId) {
        throw new GraphQLError('Unauthorized');
      }

      return db.post.update({
        ...query,
        data: {
          ...args.input,
        },
        where: {
          id: args.id,
        },
      });
    },
  }),
  deletePost: t.prismaField({
    type: 'Post',
    description: 'Delete post',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);

      if (!userId) {
        throw new GraphQLError('Unauthorized');
      }

      const post = await db.post.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      });

      if (!post) {
        throw new GraphQLError('Post not found');
      }

      if (post.authorId !== userId) {
        throw new GraphQLError('Unauthorized');
      }

      return db.post.delete({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  }),
}));
