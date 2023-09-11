import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { FieldError } from '../../fields/FieldError';
import { Project, User } from '../../prisma/generated/type-graphql';
import { CountResponse, IdsResponse } from '../post/post';
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
  @FieldResolver(() => User)
  creator(@Root() project: Project, @Ctx() { userLoader }: Context) {
    return userLoader.load(parseInt(project.authorId, 10));
  }

  @FieldResolver(() => Boolean)
  async isAuthor(
    @Root() project: Project,
    @Ctx() { req, projectLoader }: Context,
  ): Promise<boolean> {
    const p = await projectLoader.load(parseInt(project.id, 10));
    return p.authorId === req.session.userId;
  }

  @FieldResolver(() => String)
  async authorFullName(
    @Root() project: Project,
    @Ctx() { projectLoader }: Context,
  ): Promise<string> {
    const p = await projectLoader.load(parseInt(project.authorId, 10));
    return `${p.author?.firstName} ${p.author?.lastName}`;
  }

  @Query(() => CountResponse)
  async countProjects() {
    const count = await db.project.count({
      where: {
        status: 'PUBLISHED',
      },
    });
    return { count };
  }

  @Query(() => [Project], {
    description: 'Returns all projects',
    nullable: true,
  })
  async projects(): Promise<Project[]> {
    // will need to add pagination args in the future here
    return db.project.findMany({
      take: 50,
      where: {
        status: 'PUBLISHED',
      },
    });
  }

  @Authorized(isAuth)
  @Query(() => [Project], { nullable: true })
  async myProjects(@Ctx() { req }: Context): Promise<Project[]> {
    return db.project.findMany({
      where: {
        authorId: req.session.userId,
      },
    });
  }

  @Query(() => [Project], {
    description: 'Returns the 5 most recent projects',
    nullable: true,
  })
  async recentProjects(): Promise<Project[]> {
    return db.project.findMany({
      take: 5,
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Query(() => IdsResponse, {
    description: 'Returns all project slugs',
    nullable: true,
  })
  async projectIds(): Promise<IdsResponse> {
    const projects = await db.project.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        id: true,
      },
    });

    return { ids: projects.map(({ id }) => id) };
  }

  @Query(() => [Project], {
    description: 'Search projects (full text search on title / intro)',
    nullable: true,
  })
  async searchProjects(
    @Arg('query', () => String) query: string,
  ): Promise<Project[]> {
    return db.project.findMany({
      where: {
        status: 'PUBLISHED',
        title: {
          search: query,
        },
        OR: [
          {
            intro: {
              search: query,
            },
          },
        ],
      },
    });
  }

  @Query(() => Project, { nullable: true })
  async project(@Arg('id', () => String) id: string): Promise<Project | null> {
    return db.project.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => ProjectResponse)
  @Authorized(isAuth)
  async createProject(
    @Arg('options') options: ProjectCreateInput,
    @Ctx() { req }: Context,
  ): Promise<ProjectResponse> {
    const project = await db.project.create({
      data: {
        ...options,
        authorId: req.session.userId,
      },
    });

    return { project };
  }

  @Mutation(() => ProjectResponse)
  @Authorized(isAuth)
  async updateProject(
    @Ctx() { req }: Context,
    @Arg('id', () => String) id: string,
    @Arg('options') options: ProjectUpdateInput,
  ): Promise<ProjectResponse> {
    const project = await db.project.findUnique({
      where: {
        id,
        authorId: req.session.userId,
      },
    });

    if (!project) {
      return {
        errors: [
          {
            field: 'id',
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
            field: 'id',
            message: 'You are not authorized to update this project',
            code: '401',
          },
        ],
      };
    }

    const updatedProject = await db.project.update({
      where: {
        id,
      },
      data: {
        ...options,
      },
    });

    return { project: updatedProject };
  }

  @Mutation(() => Boolean)
  @Authorized(isAuth)
  async deleteProject(
    @Ctx() { req }: Context,
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    const project = await db.project.findUnique({
      where: {
        id,
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
        id,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deleteProjectAdmin(
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    const project = await db.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return false;
    }

    await db.project.delete({
      where: {
        id,
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

  @Mutation(() => Boolean)
  async publishAllProjects(): Promise<boolean> {
    await db.project.updateMany({
      data: {
        status: 'PUBLISHED',
      },
    });
    return true;
  }
}
