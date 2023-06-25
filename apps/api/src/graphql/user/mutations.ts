import { AccountStatus } from '@prisma/client';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import builder from '../../builder';
import db from '../../db';
import decodeAccessToken from '../../lib/jwt/decodeAccessToken';
import githubService from '../../services/githubService';
import { Role } from './queries';

const UpdateUserInput = builder.inputType('UpdateUserInput', {
  description: 'Update user info',
  fields: t => ({
    firstName: t.string({ required: true }),
    lastName: t.string({ required: true }),
    email: t.string({ required: true }),
    username: t.string({ required: true }),
    bio: t.string({ required: true }),
    image: t.string({ required: true }),
    location: t.string({ required: true }),
    website: t.string({ required: true }),
    twitter: t.string({ required: true }),
    github: t.string({ required: true }),
    banned: t.field({
      type: AccountStatus,
      required: false,
    }),
  }),
});

const UserFollowActions = builder.enumType('UserFollowActions', {
  description: 'User follow actions enum',
  values: ['FOLLOW', 'UNFOLLOW'],
});

const FollowUserInput = builder.inputType('FollowUserInput', {
  description: 'Follow user input',
  fields: t => ({
    userId: t.id(),
    action: t.field({
      type: UserFollowActions,
    }),
  }),
});

builder.mutationType({
  fields: t => ({
    signup: t.field({
      type: 'String',
      description: 'Signup a user',
      args: {
        token: t.arg.string({ required: true }), // github token secret
      },
      resolve: async (_, args) => {
        const data = await githubService.getUser(args.token);

        const user = await db.user.findFirst({
          where: {
            providerId: parseInt(data.id, 10),
          },
        });

        if (user) {
          // user already exists so sign them in
          const token = jwt.sign(user.id, process.env.JWT_SECRET);

          return token;
        }

        const newUser = await db.user.create({
          data: {
            providerId: parseInt(data.id, 10),
            firstName: data.name,
            lastName: '',
            email: data.email,
            username: data.login,
            image: data.avatar_url,
            provider: 'GITHUB',
          },
        });

        const token = jwt.sign(newUser.id, process.env.JWT_SECRET);

        return token;
      },
    }),
    login: t.field({
      type: 'String',
      description: 'Login a user',
      args: {
        token: t.arg.string({ required: true }), // github token secret
      },
      resolve: async (_, args) => {
        const data = await githubService.getUser(args.token);

        const user = await db.user.findFirst({
          where: {
            providerId: parseInt(data.id, 10),
          },
        });

        if (!user) {
          throw new GraphQLError('User not found');
        }

        const token = jwt.sign(user.id, process.env.JWT_SECRET);

        return token;
      },
    }),
    updateUser: t.prismaField({
      type: 'User',
      description: "Update a user's information",
      args: {
        input: t.arg({ type: UpdateUserInput, required: true }),
      },
      resolve: async (query, _, args, ctx) => {
        const userId = decodeAccessToken(ctx?.accessToken);

        if (!userId) {
          throw new GraphQLError('Not authorized');
        }

        const user = await db.user.findUnique({
          ...query,
          where: {
            id: userId.toString(),
          },
        });

        if (!user) {
          throw new GraphQLError('User not found');
        }

        return db.user.update({
          ...query,
          where: {
            id: userId.toString(),
          },
          data: {
            ...args.input,
          },
        });
      },
    }),
    updateUserRole: t.prismaField({
      type: 'User',
      description: "Update a user's role",
      args: {
        userId: t.arg.string({ required: true }),
        role: t.arg({ required: true, type: Role }),
      },
      resolve: async (query, _, args, ctx) => {
        const currentUserId = decodeAccessToken(ctx?.accessToken);

        if (!currentUserId) {
          throw new GraphQLError('Not authorized');
        }

        const user = await db.user.findUnique({
          ...query,
          where: {
            id: currentUserId.toString(),
          },
        });

        if (!user) {
          throw new GraphQLError('User not found');
        }

        if (user.role !== 'ADMIN') {
          throw new GraphQLError('Not authorized');
        }

        return db.user.update({
          ...query,
          where: {
            id: args.userId.toString(),
          },
          data: {
            role: args.role,
          },
        });
      },
    }),
    updateAccountStatus: t.prismaField({
      type: 'User',
      description: "Update a user's ban status",
      args: {
        userId: t.arg.string({ required: true }),
        accountStatus: t.arg({ required: true, type: AccountStatus }),
      },
      resolve: async (query, _, args, ctx) => {
        const currentUserId = decodeAccessToken(ctx?.accessToken);

        if (!currentUserId) {
          throw new GraphQLError('Not authorized');
        }

        const user = await db.user.findUnique({
          ...query,
          where: {
            id: currentUserId.toString(),
          },
        });

        if (!user) {
          throw new GraphQLError('User not found');
        }

        if (user.role !== 'ADMIN') {
          throw new GraphQLError('Not authorized');
        }

        return db.user.update({
          ...query,
          where: {
            id: args.userId.toString(),
          },
          data: {
            accountStatus: args.accountStatus,
          },
        });
      },
    }),
    followerUser: t.prismaField({
      type: 'User',
      description: 'Follow a user or unfollow a user',
      args: {
        input: t.arg({ type: FollowUserInput, required: true }),
      },
      resolve: async (query, _, args, ctx) => {
        const currentUserId = decodeAccessToken(ctx?.accessToken);

        if (!currentUserId) {
          throw new GraphQLError('Not authorized');
        }

        const isFollowing = args?.input.action === 'FOLLOW';

        // determine if the user wants to follow or unfollow
        const action = isFollowing ? 'connect' : 'disconnect';

        const targetUser = await db.user.findUnique({
          ...query,
          where: {
            id: args?.input?.userId?.toString() as string,
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data: {
            followers: {
              [action]: {
                id: currentUserId,
              },
            },
          },
        });

        if (!targetUser) {
          throw new GraphQLError('User not found');
        }

        // update current user
        await db.user.update({
          ...query,
          where: {
            id: currentUserId.toString(),
          },
          data: {
            following: {
              [action]: {
                id: args?.input.userId,
              },
            },
          },
        });

        return targetUser;
      },
    }),
    deleteUser: t.prismaField({
      type: 'User',
      description: 'Delete a user',
      args: {
        userId: t.arg.string({ required: true }),
      },
      resolve: async (query, _, args, ctx) => {
        const currentUserId = decodeAccessToken(ctx?.accessToken);

        if (!currentUserId) {
          throw new GraphQLError('Not authorized');
        }

        const user = await db.user.findUnique({
          ...query,
          where: {
            id: currentUserId.toString(),
          },
        });

        if (!user) {
          throw new GraphQLError('User not found');
        }

        if (user.role !== 'ADMIN') {
          throw new GraphQLError('Not authorized');
        }

        return db.user.delete({
          ...query,
          where: {
            id: args.userId.toString(),
          },
        });
      },
    }),
  }),
});
