import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import builder from '../../builder';
import db from '../../db';
import decodeAccessToken from '../../lib/jwt/decodeAccessToken';
import {
  getUserPaginationArgs,
  SearchArgs,
} from '../../lib/prisma/getPaginationArgs';

export const SearchOrder = builder.enumType('SearchOrder', {
  description: 'Search order',
  values: ['asc', 'desc'] as const,
});

export const Role = builder.enumType('Role', {
  values: ['ADMIN', 'USER'] as const,
  description: 'The role of the user',
});

export const AccountStatus = builder.enumType('AccountStatus', {
  values: ['BANNED', 'ON_HOLD', 'ACTIVE'],
  description: 'The status of the user account',
});

export const User = builder.prismaObject('User', {
  name: 'User',
  description: 'A user',
  fields: t => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email', {
      nullable: true,
      description: 'The email of the user',
    }),
    role: t.expose('role', { type: Role }),
    username: t.exposeString('username', {
      nullable: true,
    }),
    image: t.exposeString('image', {
      nullable: true,
    }),
    github: t.exposeString('github', {
      nullable: true,
    }),
    twitter: t.exposeString('twitter', {
      nullable: true,
    }),
    website: t.exposeString('website', {
      nullable: true,
    }),
    bio: t.exposeString('bio', {
      nullable: true,
    }),
    location: t.exposeString('location', {
      nullable: true,
    }),
    accountStatus: t.expose('accountStatus', {
      type: AccountStatus,
    }),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    // relations
    projects: t.relation('projects', { nullable: true }),
    posts: t.relation('posts', { nullable: true }),
    followers: t.relation('followers', { nullable: true }),
    following: t.relation('following', { nullable: true }),
    followingCount: t.relationCount('following'),
    followersCount: t.relationCount('followers'),
    isFollowing: t.boolean({
      resolve: async (parent, _args, ctx) => {
        try {
          const userId = decodeAccessToken(ctx?.accessToken);

          // user is not logged in
          if (!userId) {
            return false;
          }

          const isUserFollowing = await db.user.findFirst({
            where: {
              id: parent.id,
              followers: {
                some: {
                  id: userId.toString(),
                },
              },
            },
          });
          return !!isUserFollowing;
        } catch (e) {
          return false;
        }
      },
    }),
    isBanned: t.boolean({
      resolve: async (parent, _args, ctx) => {
        try {
          const userId = decodeAccessToken(ctx?.accessToken);

          // user is not logged in
          if (!userId) {
            return false;
          }

          const isUserBanned = await db.user.findFirst({
            where: {
              id: parent.id,
              accountStatus: 'BANNED',
            },
          });
          return !!isUserBanned;
        } catch (e) {
          return false;
        }
      },
    }),
    isOnHold: t.boolean({
      resolve: async (parent, _args, ctx) => {
        try {
          const userId = decodeAccessToken(ctx?.accessToken);

          // user is not logged in
          if (!userId) {
            return false;
          }

          const isUserOnHold = await db.user.findFirst({
            where: {
              id: parent.id,
              accountStatus: 'ON_HOLD',
            },
          });
          return !!isUserOnHold;
        } catch (e) {
          return false;
        }
      },
    }),
  }),
});

const SearchUsersInput = builder.inputType('SearchUsersInput', {
  description: 'Search user input',
  fields: t => ({
    cursor: t.string({
      required: false,
    }),
    search: t.string(),
    order: t.field({ type: SearchOrder }),
    orderBy: t.string(),
  }),
});

const UserResponse = builder.objectType('UserResponse', {
  description: 'User response',
  fields: t => ({
    totalCount: t.exposeInt('totalCount'),
    results: t.expose('results', { type: [User] }),
    bannedUsersCount: t.exposeInt('bannedUsersCount'),
    onHoldUsersCount: t.exposeInt('onHoldUsersCount'),
  }),
});

const UsersResponse = builder.objectType('UsersResponse', {
  description: 'Users response',
  fields: t => ({
    nextCursor: t.exposeString('nextCursor', { nullable: true }),
    prevCursor: t.exposeString('prevCursor', { nullable: true }),
    totalCount: t.exposeInt('totalCount'),
    results: t.expose('results', { type: [User] }),
  }),
});

builder.queryType({
  fields: t => ({
    getUser: t.prismaField({
      type: 'User',
      description: 'Get a user by id',
      args: { id: t.arg.string({ required: true }) },
      resolve: async (query, _, args) => {
        const user = await db.user.findUnique({
          ...query,
          where: {
            id: args.id,
          },
        });

        if (!user) {
          throw new GraphQLError('User not found');
        }
        return user;
      },
    }),
    getCurrentUser: t.prismaField({
      type: 'User',
      description: 'Get the currently authenticated user',
      resolve: async (query, _, __, ctx) => {
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

        return user;
      },
    }),
    getCurrentUserAsAdmin: t.prismaField({
      type: 'User',
      description:
        'Get the currently authenticated user. Only available if the user has an ADMIN role',
      resolve: async (query, _, __, ctx) => {
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

        if (user.role !== 'ADMIN') {
          throw new GraphQLError('Not authorized');
        }

        return user;
      },
    }),
    getAllUsers: t.field({
      type: UserResponse,
      description: 'Get all users',
      resolve: async () => {
        const totalCount = await db.user.count();
        const bannedUsers = await db.user.count({
          where: {
            accountStatus: 'BANNED',
          },
        });

        const onHoldUsers = await db.user.count({
          where: {
            accountStatus: 'ON_HOLD',
          },
        });

        const results = await db.user.findMany();
        return {
          totalCount,
          bannedUsersCount: bannedUsers,
          onHoldUsersCount: onHoldUsers,
          results,
        };
      },
    }),
    getAllUsersAdmin: t.field({
      type: UsersResponse,
      description:
        'Get all users. Only available if the user has an ADMIN role',
      args: {
        input: t.arg({ type: SearchUsersInput }),
      },
      resolve: async (_, args, ctx) => {
        const incomingCursor = args?.input?.cursor;

        let results;

        const userId = decodeAccessToken(ctx?.accessToken);

        if (!userId) {
          throw new GraphQLError('Not authorized');
        }

        const currentUser = await db.user.findUnique({
          where: {
            id: userId.toString(),
          },
        });

        if (!currentUser || currentUser.role !== 'ADMIN') {
          throw new GraphQLError('Not authorized');
        }

        const filter: Prisma.UserScalarWhereInput | undefined = {
          OR: [
            {
              firstName: {
                contains: args?.input?.search ?? undefined,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: args?.input?.search ?? undefined,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: args?.input?.search ?? undefined,
                mode: 'insensitive',
              },
            },
          ],
        };

        const totalCount = await db.user.count({
          where: filter,
        });

        if (incomingCursor) {
          results = await db.user.findMany(
            getUserPaginationArgs(args as SearchArgs, false, filter),
          );
        }

        results = await db.user.findMany(
          getUserPaginationArgs(args as SearchArgs, true, filter),
        );

        // 10 posts per page
        const nextCursor = results.length === 10 ? results[9].id : '';

        return {
          prevCursor: args?.input?.cursor || '',
          nextCursor,
          results,
          totalCount,
        };
      },
    }),
  }),
});
