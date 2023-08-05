import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import slugify from 'slugify';
import { FieldError } from '../../utils/FieldError';
import { Project } from '../../prisma/generated/type-graphql';
import { CountResponse, SlugsResponse } from '../post/post';
import { db } from '../../db/prisma';
import isAuth from '../../middleware/isAuth';
import { ProjectCreateInput } from './inputs/ProjectCreateInput';
import { Context } from '../../types/Context';
import { ProjectUpdateInput } from './inputs/ProjectUpdateInput';
import { isAdmin } from '../../middleware/isAdmin';

@ObjectType()
class ProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Project, { nullable: true })
  project?: Project;
}

@Resolver(Project)
export class ProjectResolver {
  @Query(() => CountResponse)
  async countProjects() {
    const count = await db.project.count();
    return { count };
  }

  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    // will need to add pagination args in the future here
    return db.project.findMany({
      take: 50,
    });
  }

  @Query(() => [Project])
  async recentProjects(): Promise<Project[]> {
    return db.project.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Query(() => SlugsResponse)
  async projectSlugs(): Promise<SlugsResponse> {
    const slugs = await db.project.findMany({
      select: {
        slug: true,
      },
    });

    return { slugs: slugs.map(({ slug }) => slug) };
  }

  @Query(() => Project, { nullable: true })
  async project(
    @Arg('slug', () => String) slug: string,
  ): Promise<ProjectResponse> {
    const project = await db.project.findUnique({
      where: {
        slug,
      },
    });

    if (!project) {
      return {
        errors: [
          {
            field: 'title',
            message: 'Project not found',
            code: '404',
          },
        ],
      };
    }

    return { project };
  }

  @Mutation(() => ProjectResponse)
  @Authorized(isAuth)
  async createProject(
    @Arg('options') options: ProjectCreateInput,
    @Ctx() { req }: Context,
  ): Promise<ProjectResponse> {
    const slug = slugify(options.title);

    const project = await db.project.create({
      data: {
        ...options,
        slug,
        authorId: req.session.userId,
        tags: {
          create: options.tags,
        },
      },
    });

    return { project };
  }

  @Mutation(() => ProjectResponse)
  @Authorized(isAuth)
  async updateProject(
    @Ctx() { req }: Context,
    @Arg('slug', () => String) slug: string,
    @Arg('options') options: ProjectUpdateInput,
  ): Promise<ProjectResponse> {
    const project = await db.project.findUnique({
      where: {
        slug,
        authorId: req.session.userId,
      },
    });

    if (!project) {
      return {
        errors: [
          {
            field: 'slug',
            message: 'Project does not exist',
            code: '404',
          },
        ],
      };
    }

    if (project.authorId !== req.session.userId) {
      return {
        errors: [
          {
            field: 'slug',
            message: 'You are not authorized to update this project',
            code: '401',
          },
        ],
      };
    }

    const updatedProject = await db.project.update({
      where: {
        slug,
      },
      data: {
        ...options,
        tags: {
          create: options.tags,
        },
      },
    });

    return { project: updatedProject };
  }

  @Mutation(() => Boolean)
  @Authorized(isAuth)
  async deleteProject(
    @Ctx() { req }: Context,
    @Arg('slug', () => String) slug: string,
  ): Promise<boolean> {
    const project = await db.project.findUnique({
      where: {
        slug,
      },
    });

    if (!project) {
      return false;
    }

    if (project.authorId !== req.session.userId) {
      return false;
    }

    await db.project.delete({
      where: {
        slug,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deleteProjectAdmin(
    @Arg('slug', () => String) slug: string,
  ): Promise<boolean> {
    const project = await db.project.findUnique({
      where: {
        slug,
      },
    });

    if (!project) {
      return false;
    }

    await db.project.delete({
      where: {
        slug,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deleteAllProjects(): Promise<boolean> {
    await db.project.deleteMany();
    return true;
  }
}
