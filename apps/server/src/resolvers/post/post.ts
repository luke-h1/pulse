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
import { Post } from '../../prisma/generated/type-graphql';
import { db } from '../../db/prisma';
import isAuth from '../../middleware/isAuth';
import { PostCreateInput } from './inputs/postCreateInput';
import { Context } from '../../types/Context';
import { PostUpdateInput } from './inputs/postUpdateInput';
import { isAdmin } from '../../middleware/isAdmin';

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
  ids?: string[];
}

@Resolver(Post)
export class PostResolver {
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

  @Query(() => [Post], {
    description: 'Returns all posts',
    nullable: true,
  })
  async posts(): Promise<Post[]> {
    // will need to add pagination args in the future here
    return db.post.findMany({
      take: 50,
      where: {
        status: 'PUBLISHED',
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

  @Query(() => [Post], {
    description: 'Search posts (full text search on title)',
    nullable: true,
  })
  async searchPosts(
    @Arg('query', () => String) query: string,
  ): Promise<Post[]> {
    return db.post.findMany({
      where: {
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
        status: 'PUBLISHED',
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
        authorId: req.session.userId,
        readingTime: '10m',
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

    if (post?.authorId !== req.session.userId) {
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
        // readingTime: readingTime(options.content).text,
        image: post.image,
      },
    });

    return { post: updatedPost };
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

  // Temporary mutation for testing
  // FIXME: add auth middleware for admin only
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
  // @Authorized(isAdmin)
  async deleteAllPosts(): Promise<boolean> {
    await db.post.deleteMany();
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deletePostAsAdmin(
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    await db.post.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
