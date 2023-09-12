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
import {
  JsonNullValueInput,
  Post,
  Status,
  User,
} from '../../prisma/generated/type-graphql';
import { db } from '../../db/prisma';
import isAuth from '../../middleware/isAuth';
import { PostCreateInput } from './inputs/postCreateInput';
import { Context } from '../../types/Context';
import { PostUpdateInput } from './inputs/postUpdateInput';
import { isAdmin } from '../../middleware/isAdmin';
import logger from '../../utils/logger';

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@ObjectType()
export class CountResponse {
  @Field(() => Number, { nullable: true })
  count?: number;
}

@ObjectType()
export class IdsResponse {
  @Field(() => [String], { nullable: true })
  ids: string[];
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: Context) {
    return userLoader.load(parseInt(post.authorId, 10));
  }

  @FieldResolver(() => Boolean)
  async isAuthor(
    @Root() post: Post,
    @Ctx() { req, postLoader }: Context,
  ): Promise<boolean> {
    const p = await postLoader.load(parseInt(post.id, 10));
    return p.authorId === req.session.userId;
  }

  @FieldResolver(() => String)
  async authorFullName(
    @Root() post: Post,
    @Ctx() { userLoader }: Context,
  ): Promise<string> {
    const user = await userLoader.load(parseInt(post.authorId, 10));
    return `${user.firstName} ${user.lastName}`;
  }

  @Query(() => CountResponse, {
    description: 'Returns the total number of posts',
    nullable: true,
  })
  async countPosts() {
    const count = await db.post.count({
      where: {
        status: 'PUBLISHED',
      },
    });
    return { count };
  }

  @Authorized(isAuth)
  @Query(() => Post, { nullable: true })
  async postStatus(@Arg('id', () => String) id: string) {
    return db.post.findUnique({
      where: {
        id,
      },
      select: {
        status: true,
      },
    });
  }

  @Authorized(isAdmin)
  @Query(() => [Post], { nullable: true })
  async adminPosts(@Ctx() { req }: Context): Promise<Post[]> {
    const u = await db.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });

    if (u?.role !== 'ADMIN') {
      return [];
    }

    return db.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Query(() => [Post], {
    description: 'Returns all posts',
    nullable: true,
  })
  async posts(@Arg('status', () => Status) status: Status): Promise<Post[]> {
    // will need to add pagination args in the future here
    return db.post.findMany({
      where: {
        status,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Query(() => [Post], {
    description: 'Returns the 5 most recent posts',
    nullable: true,
  })
  async recentPosts(): Promise<Post[]> {
    return db.post.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'PUBLISHED',
      },
    });
  }

  @Authorized(isAuth)
  @Query(() => [Post], { nullable: true })
  async myPosts(@Ctx() { req }: Context): Promise<Post[]> {
    return db.post.findMany({
      where: {
        authorId: req.session.userId,
      },
    });
  }

  @Query(() => [Post], {
    description: 'Search posts (text search on title)',
    nullable: true,
  })
  async searchPosts(
    @Arg('query', () => String) query: string,
  ): Promise<Post[]> {
    return db.post.findMany({
      where: {
        title: {
          contains: query,
        },
        AND: {
          status: {
            equals: 'PUBLISHED',
          },
        },
      },
    });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id', () => String) id: string): Promise<Post | null> {
    return db.post.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => PostResponse)
  @Authorized(isAuth)
  async createPost(
    @Arg('options') options: PostCreateInput,
    @Ctx() { req }: Context,
  ): Promise<PostResponse> {
    const post = await db.post.create({
      data: {
        ...options,
        content: options.content as unknown as JsonNullValueInput,
        authorId: req.session.userId,
        image: options.image,
      },
    });

    return { post };
  }

  @Mutation(() => PostResponse, {
    description: 'Updates a post',
  })
  @Authorized(isAuth)
  async updatePost(
    @Ctx() { req }: Context,
    @Arg('id', () => String) id: string,
    @Arg('options') options: PostUpdateInput,
  ): Promise<PostResponse> {
    const post = await db.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return {
        errors: [
          {
            field: 'title',
            message: 'Post not found',
            code: '404',
          },
        ],
      };
    }

    if (post?.authorId !== req.session.userId) {
      logger.info('User in un-authorized to view this post');
      return {
        errors: [
          {
            field: 'title',
            message: 'You are not authorized to update this post',
            code: '401',
          },
        ],
      };
    }
    const updatedPost = await db.post.update({
      where: {
        id,
      },
      data: {
        ...options,
        content: options.content as unknown as JsonNullValueInput,
        image: post.image,
      },
    });

    return {
      post: updatedPost,
    };
  }

  @Mutation(() => Boolean, {
    description: 'Deletes a post',
  })
  @Authorized(isAuth)
  async deletePost(
    @Arg('id', () => String) id: string,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    const post = await db.post.findUnique({
      where: {
        id,
      },
    });

    if (post?.authorId !== req.session.userId) {
      return false;
    }

    await db.post.delete({
      where: {
        id,
      },
    });

    return true;
  }

  @Authorized(isAdmin)
  @Mutation(() => Boolean)
  async publishAllPosts(): Promise<boolean> {
    await db.post.updateMany({
      where: {
        status: 'DRAFT',
      },
      data: {
        status: 'PUBLISHED',
      },
    });

    return true;
  }

  @Query(() => IdsResponse, {
    description: 'Returns all post slugs',
    nullable: true,
  })
  async postIds(): Promise<IdsResponse> {
    const posts = await db.post.findMany({
      select: {
        id: true,
      },
      where: {
        status: 'PUBLISHED',
      },
    });

    return { ids: posts.map(post => post.id) };
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deleteAllPosts(@Ctx() { req }: Context): Promise<boolean> {
    const u = await db.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });

    if (u?.role !== 'ADMIN') {
      return false;
    }

    await db.post.deleteMany();

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deletePostAsAdmin(
    @Ctx() { req }: Context,
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    const u = await db.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });

    if (u?.role !== 'ADMIN') {
      return false;
    }

    await db.post.delete({
      where: {
        id,
      },
    });
    return true;
  }
}
