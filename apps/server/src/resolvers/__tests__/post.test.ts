import 'reflect-metadata';
import { db } from '../../db/prisma';
import { PostResolver } from '../post/post';
import resetDb from '../../test/resetDb';
import { Status } from '../../prisma/generated/type-graphql';

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await db.$disconnect();
});

describe('post', () => {
  test('countPosts returns count of posts', async () => {
    const resolver = new PostResolver();

    await db.user.createMany({
      data: [
        {
          email: 'test1@test.com',
          firstName: 'test',
          lastName: 'test',
          password: 'test',
          role: 'USER',
          username: 'test1',
        },
        {
          email: 'test2@test.com',
          firstName: 'test',
          lastName: 'test',
          password: 'test',
          role: 'USER',
          username: 'test2',
        },
        {
          email: 'test3@test.com',
          firstName: 'test',
          lastName: 'test',
          password: 'test',
          role: 'USER',
          username: 'test3',
        },
      ],
    });

    const users = await db.user.findMany();

    await db.post.createMany({
      data: [
        {
          title: 'test',
          intro: 'test',
          content: { test: 'test' },
          slug: 'test',
          authorId: users[0].id,
          readingTime: '10m',
          status: 'PUBLISHED',
        },
        {
          title: 'test 2',
          intro: 'test 2',
          content: { test: 'test 2' },
          slug: 'test-2',
          authorId: users[1].id,
          readingTime: '10m',
          status: 'PUBLISHED',
        },
        {
          title: 'test 3',
          intro: 'test 3',
          content: { test: 'test 3' },
          slug: 'test-3',
          authorId: users[2].id,
          readingTime: '10m',
          status: 'PUBLISHED',
        },
      ],
    });

    const response = await resolver.countPosts();

    expect(response).toEqual({
      count: 3,
    });
  });

  test('returns allPosts', async () => {
    const resolver = new PostResolver();

    const user = await db.user.create({
      data: {
        email: 'bob@bob.com',
        firstName: 'bob',
        lastName: 'bob',
        password: 'bob',
        role: 'USER',
        username: 'bob',
      },
    });

    const testPost = {
      title: 'test',
      intro: 'test',
      content: { test: 'test' },
      slug: 'test',
      authorId: user.id,
      readingTime: '10m',
      status: Status.PUBLISHED,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.post.create({
      data: testPost,
    });

    const response = await resolver.posts();

    expect(response).toEqual([
      {
        authorId: expect.any(String),
        content: {
          test: 'test',
        },
        createdAt: expect.any(Date),
        id: expect.any(String),
        image: null,
        imageFilename: null,
        intro: 'test',
        readingTime: '10m',
        slug: 'test',
        status: 'PUBLISHED',
        tags: expect.any(Array),
        title: 'test',
        updatedAt: expect.any(Date),
      },
    ]);
  });

  test('returns recentPosts', async () => {
    const resolver = new PostResolver();

    const user = await db.user.create({
      data: {
        email: 'test@test.com',
        firstName: 'test',
        lastName: 'test',
        password: 'test',
        role: 'USER',
        username: 'test',
      },
    });

    for (let i = 0; i < 10; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.post.create({
        data: {
          title: `test ${i}`,
          intro: `test ${i}`,
          content: { test: `test ${i}` },
          slug: `test-${i}`,
          authorId: user.id,
          readingTime: '10m',
          status: 'PUBLISHED',
        },
      });
    }

    const response = await resolver.recentPosts();

    expect(response.length).toEqual(5);
  });

  test.skip('searchPosts performs full text search on title/intro', async () => {
    const resolver = new PostResolver();

    const user = await db.user.create({
      data: {
        email: 'test@test.com',
        firstName: 'test',
        lastName: 'test',
        password: 'test',
        role: 'USER',
        username: 'test',
      },
    });

    for (let i = 0; i < 10; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.post.create({
        data: {
          title: `test ${i}`,
          intro: `test ${i}`,
          content: { test: `test ${i}` },
          slug: `test-${i}`,
          authorId: user.id,
          readingTime: '10m',
          status: 'PUBLISHED',
        },
      });
    }

    const response = await resolver.searchPosts('test 1');

    expect(response.length).toEqual(1);
  });

  test('post return post by slug', async () => {
    const resolver = new PostResolver();

    const user = await db.user.create({
      data: {
        email: 'test@test.com',
        firstName: 'test',
        lastName: 'test',
        password: 'test',
        role: 'USER',
        username: 'test',
      },
    });

    const testPost = {
      title: 'test',
      intro: 'test',
      content: { test: 'test' },
      slug: 'test',
      authorId: user.id,
      readingTime: '10m',
      status: Status.PUBLISHED,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const post = await db.post.create({
      data: testPost,
    });

    const response = await resolver.post(post.slug);

    expect(response).toEqual({
      post: {
        authorId: expect.any(String),
        content: { test: 'test' },
        createdAt: expect.any(Date),
        id: expect.any(String),
        image: null,
        imageFilename: null,
        intro: 'test',
        readingTime: '10m',
        slug: 'test',
        status: 'PUBLISHED',
        tags: [],
        title: 'test',
        updatedAt: expect.any(Date),
      },
    });
  });

  test('createPost creates post', async () => {});

  test('updatePost updates post if exists', async () => {});

  test("updatePost returns validation error if post doesn't exist", async () => {});

  test("updatePost returns validation error if user isn't authorized", async () => {});

  test('deletePost deletes post if user is authorized', async () => {});

  test("deletePost doesn't deletes post if user is not authorized", async () => {});

  test('postSlugs returns list of post slugs', async () => {});

  test('deleteAllPosts deletes all post if admin', async () => {});

  test('deletePost deletes post if admin', async () => {});
});
