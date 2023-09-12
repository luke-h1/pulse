import 'reflect-metadata';
import { Role, Status } from '@prisma/client';
import { db } from '../../db/prisma';
import { PostResolver } from '../post/post';
import resetDb from '../../test/resetDb';
import { Status as TypeGraphQLStatus } from '../../prisma/generated/type-graphql';
import { generateTestUsers } from '../../test/__data__/user';
import { generateTestPosts } from '../../test/__data__/post';
import {
  createApiMocks,
  createDataLoaderMocks,
  createMockRedis,
} from '../../test/__mocks__/server';

beforeEach(async () => {
  await resetDb();
});

afterEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await db.$disconnect();
});

describe('post', () => {
  test('countResponse', async () => {
    const resolver = new PostResolver();

    const count = await resolver.countPosts();

    expect(count).toEqual({ count: 0 });

    const users = generateTestUsers(5);
    const posts = generateTestPosts(5);

    await db.user.createMany({
      data: [...users],
    });

    posts.forEach((post, i) => {
      // eslint-disable-next-line no-param-reassign
      post.authorId = users[i].id;
    });

    await db.post.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...posts],
    });

    const count2 = await resolver.countPosts();

    expect(count2).toEqual({ count: 5 });
  });

  test('postStatus', async () => {
    const resolver = new PostResolver();

    const count = await resolver.countPosts();

    expect(count).toEqual({ count: 0 });

    const users = generateTestUsers(5);
    const posts = generateTestPosts(5);

    await db.user.createMany({
      data: [...users],
    });

    posts.forEach((post, i) => {
      // eslint-disable-next-line no-param-reassign
      post.authorId = users[i].id;
    });

    await db.post.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...posts],
    });

    const postStatus = await resolver.postStatus(posts[0].id);

    expect(postStatus).toEqual({ status: 'PUBLISHED' });
  });
  describe('adminPosts', () => {
    test('returns all posts if admin', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);
      user[0].role = Role.ADMIN;

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      createApiMocks({
        session: {
          userId: user[0].id,
        },
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: user[0].id,
        },
      });

      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.adminPosts({
        req,
        res,
        redis,
        ...dataLoaderMocks,
      });

      expect(response).toEqual(posts);
    });
    test('returns no posts if not admin', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      const { req, res } = createApiMocks({
        session: {
          userId: user[0].id,
        },
      });

      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.adminPosts({
        req,
        res,
        redis,
        ...dataLoaderMocks,
      });

      expect(response).toEqual([]);
    });
  });
  describe('posts', () => {
    test('returns all posts', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.posts(TypeGraphQLStatus.PUBLISHED);

      expect(response.length).toEqual(5);
    });

    test('returns posts by status', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      posts[0].status = Status.DRAFT;
      posts[1].status = Status.DRAFT;

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.posts(TypeGraphQLStatus.PUBLISHED);
      expect(response.length).toEqual(3);

      const response2 = await resolver.posts(TypeGraphQLStatus.DRAFT);
      expect(response2.length).toEqual(2);
    });
  });

  test('recentPosts returns 5 most recent posts', async () => {
    const resolver = new PostResolver();

    const user = generateTestUsers(2);

    await db.user.createMany({
      data: [...user],
    });

    const posts = generateTestPosts(5);

    posts.forEach(post => {
      // eslint-disable-next-line no-param-reassign
      post.authorId = user[1].id;
    });

    await db.post.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...posts],
    });

    const response = await resolver.recentPosts();

    expect(response.length).toEqual(5);
  });

  test('myPosts', async () => {
    const resolver = new PostResolver();

    const user = generateTestUsers(2);

    await db.user.createMany({
      data: [...user],
    });

    const posts = generateTestPosts(5);

    posts.forEach(post => {
      // eslint-disable-next-line no-param-reassign
      post.authorId = user[1].id;
    });

    await db.post.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...posts],
    });

    const { req, res } = createApiMocks({
      session: {
        userId: user[0].id,
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.myPosts({
      req,
      res,
      redis,
      ...dataLoaderMocks,
    });

    expect(response.length).toEqual(0);

    // change to user who owns the posts
    req.session.userId = user[1].id;

    const response2 = await resolver.myPosts({
      req,
      res,
      redis,
      ...dataLoaderMocks,
    });

    expect(response2.length).toEqual(5);
  });

  test('searchPosts', async () => {
    const resolver = new PostResolver();

    const user = generateTestUsers(2);

    await db.user.createMany({
      data: [...user],
    });

    const posts = generateTestPosts(5);

    posts.forEach((post, i) => {
      // eslint-disable-next-line no-param-reassign
      post.authorId = user[1].id;
      // eslint-disable-next-line no-param-reassign
      post.title = `test ${i}`;
    });

    await db.post.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...posts],
    });

    const response = await resolver.searchPosts('test');

    expect(response.length).toEqual(5);

    // refine search
    const response2 = await resolver.searchPosts('test 1');

    expect(response2.length).toEqual(1);

    // refine search
    const response3 = await resolver.searchPosts(
      'yo yo yo this is luke from the past hey future luke 😁',
    );

    expect(response3.length).toEqual(0);
  });

  describe('post', () => {
    test('returns post by id', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.post(posts[0].id);

      expect(response).toEqual(posts[0]);
    });

    test('returns null if post does not exist', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.post('123');

      expect(response).toEqual([]);
    });
  });

  test('createPost', async () => {
    const resolver = new PostResolver();

    const user = generateTestUsers(2);

    await db.user.createMany({
      data: [...user],
    });

    const posts = generateTestPosts(1);

    const { req, res } = createApiMocks({
      session: {
        userId: user[0].id,
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - fake lib returns null instead of undefined
    const response = await resolver.createPost(posts[0], {
      req,
      res,
      redis,
      ...dataLoaderMocks,
    });

    expect(response?.errors?.length).toEqual(undefined);

    expect(response?.post?.title).toEqual(posts[0].title);
  });

  describe('updatePost', () => {
    test('updates post if exists and user is owner', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: user[1].id,
        },
      });
      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.updatePost(
        {
          req,
          res,
          redis,
          ...dataLoaderMocks,
        },
        posts[0].id,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - fake lib returns null instead of undefined
        {
          ...posts[0],
        },
      );

      expect(response?.errors?.length).toEqual(undefined);

      expect(response?.post?.title).toEqual(posts[0].title);
    });

    test('returns validation error if post does not exist', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: user[1].id,
        },
      });
      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.updatePost(
        {
          req,
          res,
          redis,
          ...dataLoaderMocks,
        },
        '123',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - fake lib returns null instead of undefined
        {
          ...posts[0],
        },
      );

      expect(response?.errors?.length).toEqual(1);

      expect(response?.errors?.[0].field).toEqual('title');
      expect(response?.errors?.[0].message).toEqual('Post not found');
    });

    test('returns validation error if user is not authorized', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: '1234',
        },
      });
      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.updatePost(
        {
          req,
          res,
          redis,
          ...dataLoaderMocks,
        },
        '123',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - fake lib returns null instead of undefined
        {
          ...posts[0],
        },
      );

      expect(response?.errors?.length).toEqual(1);

      // return 404 instead of 403 for security reasons
      expect(response?.errors?.[0].field).toEqual('title');
      expect(response?.errors?.[0].message).toEqual('Post not found');
    });
  });

  describe('deletePost', () => {
    test('deletes post if user is authorized', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: user[1].id,
        },
      });
      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.deletePost(posts[0].id, {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      });

      expect(response).toEqual(true);
    });

    test('returns false if user is not authorized', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: user[0].id,
        },
      });
      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.deletePost(posts[0].id, {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      });

      expect(response).toEqual(false);
    });
  });

  describe('publishAllPosts', () => {
    test('publishes all posts', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);
      user[0].role = Role.ADMIN;

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.publishAllPosts();

      expect(response).toEqual(true);
    });

    test('returns false if user is not authorized', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.publishAllPosts();

      expect(response).toEqual(false);
    });
  });

  describe('deleteAllPosts', () => {
    test('deletes all posts if admin', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);
      user[0].role = Role.ADMIN;

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.deleteAllPosts();

      expect(response).toEqual(true);
    });

    test('returns false if not admin', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const response = await resolver.deleteAllPosts();

      expect(response).toEqual(false);
    });
  });

  test('postIds returns all post ids', async () => {
    const resolver = new PostResolver();

    const user = generateTestUsers(2);

    await db.user.createMany({
      data: [...user],
    });

    const posts = generateTestPosts(5);

    posts.forEach(post => {
      // eslint-disable-next-line no-param-reassign
      post.authorId = user[1].id;
    });

    await db.post.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...posts],
    });

    const response = await resolver.postIds();

    expect(response).toEqual({
      ids: posts.map(post => post.id),
    });
  });

  describe('deletePostAsAdmin', () => {
    test('deletes post if admin', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);
      user[0].role = Role.ADMIN;

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: user[0].id,
        },
      });

      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.deletePostAsAdmin(
        { req, res, redis, ...dataLoaderMocks },
        posts[0].id,
      );

      expect(response).toEqual(true);
    });

    test('returns false if not admin', async () => {
      const resolver = new PostResolver();

      const user = generateTestUsers(2);

      await db.user.createMany({
        data: [...user],
      });

      const posts = generateTestPosts(5);

      posts.forEach(post => {
        // eslint-disable-next-line no-param-reassign
        post.authorId = user[1].id;
      });

      await db.post.createMany({
        // @ts-expect-error - prisma thinks @editorjs blocks are not valid
        data: [...posts],
      });

      const { req, res } = createApiMocks({
        session: {
          userId: '1234',
        },
      });

      const redis = createMockRedis();
      const dataLoaderMocks = createDataLoaderMocks();

      const response = await resolver.deletePostAsAdmin(
        { req, res, redis, ...dataLoaderMocks },
        posts[0].id,
      );

      expect(response).toEqual(false);
    });
  });
});
