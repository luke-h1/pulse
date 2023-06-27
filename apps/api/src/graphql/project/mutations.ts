import { GraphQLError } from 'graphql';
import slugify from 'slugify';
import builder from '../../builder';
import db from '../../db';
import decodeAccessToken from '../../lib/jwt/decodeAccessToken';

const ProjectInput = builder.inputType('CreateProjectInput', {
  description: 'Create new project',
  fields: t => ({
    title: t.string({ required: true }),
    intro: t.string({ required: true }),
    content: t.field({
      required: true,
      type: 'JSON',
    }),
    githubUrl: t.string({ required: false }),
    siteUrl: t.string({ required: false }),
    appStoreUrl: t.string({ required: false }),
    playStoreUrl: t.string({ required: false }),
    tags: t.stringList({ required: true }),
  }),
});

builder.mutationFields(t => ({
  createProject: t.prismaField({
    type: 'Project',
    description: 'Create new project',
    args: {
      input: t.arg({ type: ProjectInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const authorId = decodeAccessToken(ctx.accessToken);

      if (!authorId) {
        throw new Error('Unauthorized');
      }

      const { tags, title, ...rest } = args.input;

      const slug = slugify(title);

      return db.project.create({
        ...query,
        data: {
          title,
          slug,
          ...rest,
          tags: {
            set: tags,
          },
          author: {
            connect: {
              id: authorId.toString(),
            },
          },
        },
        include: {
          author: true,
        },
      });
    },
  }),
  updateProject: t.prismaField({
    type: 'Project',
    description: 'Update project',
    args: {
      projectId: t.arg.string({ required: true }),
      input: t.arg({ type: ProjectInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const authorId = decodeAccessToken(ctx.accessToken);

      if (!authorId) {
        throw new GraphQLError('Unauthorized');
      }

      const userOwnsProject = await db.project.findFirst({
        where: {
          id: args.projectId,
          authorId: authorId.toString(),
        },
      });

      if (!userOwnsProject) {
        throw new GraphQLError('Unauthorized');
      }

      const { tags, title, ...rest } = args.input;

      const slug = slugify(title); // TODO LH: maybe think about redirecting old slugs to new ones

      return db.project.update({
        ...query,
        where: {
          id: args.projectId,
        },
        data: {
          title,
          slug,
          ...rest,
          tags: {
            set: tags,
          },
        },
      });
    },
  }),
  deleteProject: t.prismaField({
    type: 'Project',
    description: 'Delete project',
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_query, _, args, ctx) => {
      const userId = decodeAccessToken(ctx.accessToken);

      if (!userId) {
        throw new GraphQLError('Unauthorized');
      }

      const userOwnsProject = await db.project.findFirst({
        where: {
          id: args.projectId,
          authorId: userId.toString(),
        },
      });

      if (!userOwnsProject) {
        throw new GraphQLError('Unauthorized');
      }

      return db.project.delete({
        where: {
          id: args.projectId,
        },
      });
    },
  }),
}));
