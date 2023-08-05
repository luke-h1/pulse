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
import { Post } from '../../prisma/src/generated/type-graphql';
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

  // TODO: extend from base pagination class for posts and projects
}

@ObjectType()
export class CountResponse {
  @Field(() => Number, { nullable: true })
  count?: number;
}

@ObjectType()
export class SlugsResponse {
  @Field(() => [String], { nullable: true })
  slugs?: string[];
}

@Resolver(Post)
export class PostResolver {
  @Query(() => CountResponse)
  async countPosts() {
    const count = await db.post.count();
    return { count };
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    // will need to add pagination args in the future here
    return db.post.findMany({
      take: 50,
    });
  }

  @Query(() => [Post])
  async recentPosts(): Promise<Post[]> {
    return db.post.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('slug', () => String) slug: string): Promise<PostResponse> {
    const post = await db.post.findUnique({
      where: {
        slug,
      },
    });

    if (!post) {
      return {
        errors: [
          {
            field: 'slug',
            message: 'Post does not exist',
          },
        ],
      };
    }

    return { post };
  }

  @Mutation(() => PostResponse)
  @Authorized(isAuth)
  async createPost(
    @Arg('options') options: PostCreateInput,
    @Ctx() { req }: Context,
  ): Promise<PostResponse> {
    const slug = slugify(options.title);

    const post = await db.post.create({
      data: {
        ...options,
        authorId: req.session.userId,
        slug,
        tags: {
          create: options.tags,
        },
      },
    });

    return { post };
  }

  @Mutation(() => PostResponse)
  @Authorized(isAuth)
  async updatePost(
    @Ctx() { req }: Context,
    @Arg('slug', () => String) slug: string,
    @Arg('options') options: PostUpdateInput,
  ): Promise<PostResponse> {
    const post = await db.post.findUnique({
      where: {
        slug,
      },
    });

    if (post?.authorId !== req.session.userId) {
      return {
        errors: [
          {
            field: 'title',
            message: 'You are not authorized to update this post',
          },
        ],
      };
    }

    const updatedPost = await db.post.update({
      where: {
        slug,
      },
      data: {
        ...options,
        slug: slugify(options.title),
        tags: {
          updateMany: {
            where: {
              postId: post.id,
            },
            data: {
              ...options.tags,
            },
          },
        },
      },
    });

    return { post: updatedPost };
  }

  @Mutation(() => Boolean)
  @Authorized(isAuth)
  async deletePost(
    @Arg('slug', () => String) slug: string,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    const post = await db.post.findUnique({
      where: {
        slug,
      },
    });

    if (post?.authorId !== req.session.userId) {
      return false;
    }

    await db.post.delete({
      where: {
        slug,
      },
    });

    return true;
  }

  @Mutation(() => SlugsResponse)
  async postSlugs(): Promise<SlugsResponse> {
    const slugs = await db.post.findMany({
      select: {
        slug: true,
      },
    });

    return { slugs: slugs.map(slug => slug.slug) };
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deleteAllPosts(): Promise<boolean> {
    await db.post.deleteMany();
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deletePostAsAdmin(
    @Arg('slug', () => String) slug: string,
  ): Promise<boolean> {
    await db.post.delete({
      where: {
        slug,
      },
    });

    return true;
  }
}
