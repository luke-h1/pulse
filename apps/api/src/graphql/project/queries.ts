import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import builder from '../../builder';
import db from '../../db';
import decodeAccessToken from '../../lib/jwt/decodeAccessToken';
import {
  SearchArgs,
  getProjectPaginationArgs,
} from '../../lib/prisma/getPaginationArgs';
import { SearchOrder } from '../user';

export const Project = builder.prismaObject('Project', {
  name: 'Project',
  description: 'Project',
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    intro: t.exposeString('intro'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: t.expose('content', {
      nullable: false,
      type: 'JSON',
    }),
    githubUrl: t.exposeString('githubUrl', {
      nullable: true,
    }),
    siteUrl: t.exposeString('siteUrl', {
      nullable: true,
    }),
    appStoreUrl: t.exposeString('appStoreUrl', {
      nullable: true,
    }),
    playStoreUrl: t.exposeString('playStoreUrl', {
      nullable: true,
    }),
    tags: t.exposeStringList('tags'),
    author: t.relation('author'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
  }),
});

const ProjectsResponse = builder.objectType('ProjectsResponse', {
  description: 'ProjectsResponse',
  fields: t => ({
    nextCursor: t.exposeString('nextCursor', {
      nullable: true,
    }),
    prevCursor: t.exposeString('prevCursor', {
      nullable: true,
    }),
    totalCount: t.exposeInt('totalCount'),
    results: t.expose('results', {
      type: [Project],
    }),
  }),
});

export const SearchInput = builder.inputType('SearchInput', {
  description: 'Search projects input',
  fields: t => ({
    cursor: t.string({ required: false }),
    search: t.string(),
    order: t.field({ type: SearchOrder }),
    orderBy: t.string(),
  }),
});

builder.queryFields(t => ({
  project: t.prismaField({
    type: Project,
    description: 'Get project by slug',
    args: {
      slug: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const project = await db.project.findUnique({
        ...query,
        where: {
          slug: args.slug,
        },
      });

      if (!project) {
        throw new GraphQLError('Project not found');
      }

      return project;
    },
  }),
  myProjects: t.field({
    description: "Get currently logged in users's projects",
    type: ProjectsResponse,
    args: {
      input: t.arg({ type: SearchInput }),
    },
    resolve: async (_, args, ctx) => {
      const userId = decodeAccessToken(ctx?.accessToken);

      if (!userId) {
        throw new GraphQLError('Unauthorized');
      }

      const incomingCursor = args.input?.cursor;
      let results;

      const filter: Prisma.ProjectWhereInput | undefined = {
        authorId: userId.toString(),
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

      const totalCount = await db.project.count({
        where: {
          authorId: userId.toString(),
        },
      });

      if (incomingCursor) {
        results = await db.project.findMany(
          getProjectPaginationArgs(args as SearchArgs, false, filter),
        );
      }

      results = await db.project.findMany(
        getProjectPaginationArgs(args as SearchArgs, true, filter),
      );

      // first 10 results
      const cursor = results[9]?.id;

      return {
        prevCursor: args.input?.cursor ?? '',
        nextCursor: cursor ?? '',
        results,
        totalCount,
      };
    },
  }),
}));
