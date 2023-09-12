import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { db } from '../../db/prisma';
import { generateTestUsers, testUsers } from '../../test/__data__/user';
import {
  createApiMocks,
  createDataLoaderMocks,
  createMockRedis,
} from '../../test/__mocks__/server';
import resetDb from '../../test/resetDb';
import { UserLoginInput } from '../user/inputs/UserLoginInput';
import { UserRegisterInput } from '../user/inputs/UserRegisterInput';
import { UserResolver } from '../user/user';

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await db.$disconnect();
});

describe('user', () => {
  test('registers a user when provided details are correct', async () => {
    const resolver = new UserResolver();

    const user: UserRegisterInput = {
      firstName: 'Bob',
      lastName: 'Smith',
      username: 'bob123',
      email: 'bob@test.com',
      password: 'password',
    };

    const { req, res } = createApiMocks({
      session: {
        destroy: jest.fn(cb => cb()),
      },
      clearCookie: jest.fn(),
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.register(
      {
        ...user,
      },
      {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      },
    );

    expect(req.session.userId).toEqual(response.user?.id);

    expect(response).toEqual({
      errors: [],
      user: {
        accountStatus: 'ACTIVE',
        bio: null,
        createdAt: expect.any(Date),
        email: 'bob@test.com',
        firstName: 'Bob',
        github: null,
        id: expect.any(String),
        image: null,
        lastName: 'Smith',
        location: null,
        password: expect.any(String),
        provider: 'session',
        role: 'USER',
        twitter: null,
        updatedAt: expect.any(Date),
        username: 'bob123',
        website: null,
      },
    });
  });

  test('authenticates a user when provided details are correct', async () => {
    const resolver = new UserResolver();

    const user = testUsers[0];

    await db.user.create({
      data: {
        ...user,
        provider: 'email',
      },
    });

    const { req, res } = createApiMocks({
      session: {
        destroy: jest.fn(cb => cb()),
      },
      clearCookie: jest.fn(),
    });

    const dataLoaderMocks = createDataLoaderMocks();
    const redis = createMockRedis();

    const loginInput: UserLoginInput = {
      email: user.email as string,
      password: 'test',
    };

    const response = await resolver.login(loginInput, {
      req,
      res,
      redis,
      ...dataLoaderMocks,
    });

    expect(req.session.userId).toEqual(response.user?.id);

    expect(response).toEqual({
      errors: [],
      user: {
        accountStatus: 'ACTIVE',
        bio: expect.any(String),
        createdAt: expect.any(Date),
        email: user.email,
        firstName: user.firstName,
        github: null,
        id: expect.any(String),
        image: null,
        lastName: user.lastName,
        location: null,
        password: expect.any(String),
        provider: 'email',
        role: 'USER',
        twitter: null,
        updatedAt: expect.any(Date),
        username: expect.any(String),
        website: null,
      },
    });
  });

  test('throws error when provided details are incorrect', async () => {
    const resolver = new UserResolver();

    const user = testUsers[1];

    await db.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email as string,
        password: user.password,
        provider: 'session',
      },
    });

    const { req, res } = createApiMocks({
      session: {
        destroy: jest.fn(cb => cb()),
      },
      clearCookie: jest.fn(),
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.register(
      {
        email: user.email as string,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: `${user.password}123`,
      },
      {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      },
    );

    expect(response).toEqual({
      errors: [
        {
          code: '409',
          field: 'email',
          message: 'An account with this email already exists.',
        },
      ],
    });
  });

  test('logs user out and destroys cookie', async () => {
    const resolver = new UserResolver();

    const { req, res } = createApiMocks({
      session: {
        destroy: jest.fn(),
      },
      cookies: {
        qid: '123',
      },
      res: {
        clearCookie: jest.fn(),
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    resolver.logout({
      req,
      res,
      redis,
      ...dataLoaderMocks,
    });

    expect(req.session.destroy).toHaveBeenCalled();
  });

  test('me query returns null when no user is logged in', async () => {
    const resolver = new UserResolver();

    const { req, res } = createApiMocks({
      session: {
        userId: '',
      },
      clearCookie: jest.fn(),
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.me({
      req,
      res,
      redis,
      ...dataLoaderMocks,
    });

    expect(response).toEqual(null);
  });

  test('deleteAccount mutation deletes user account', async () => {
    const resolver = new UserResolver();

    const tu = generateTestUsers(1);

    const u = await db.user.create({
      data: {
        firstName: tu[0].firstName,
        lastName: tu[0].lastName,
        username: tu[0].username,
        email: tu[0].email as string,
        password: tu[0].password,
        provider: 'session',
      },
    });

    const { req, res } = createApiMocks({
      session: {
        userId: u.id,
      },
      clearCookie: jest.fn(),
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.deleteAccount({
      req,
      res,
      redis,
      ...dataLoaderMocks,
    });

    expect(response).toEqual(true);
  });

  test('deleteUser mutation only runs when user is admin', async () => {
    const resolver = new UserResolver();

    const adminUser = await db.user.create({
      data: {
        firstName: 'test',
        lastName: 'test',
        username: 'test12345',
        email: 'test@test.com',
        role: 'ADMIN',
        password: await bcrypt.hash('password', 10),
        provider: 'session',
      },
    });

    const { req, res } = createApiMocks({
      session: {
        userId: adminUser.id,
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const user = await db.user.create({
      data: {
        firstName: 'test',
        lastName: 'test',
        username: 'test123456',
        email: 'admin@test.com',
        password: await bcrypt.hash('password', 10),
        provider: 'session',
      },
    });

    const response = await resolver.deleteUser(
      { req, res, redis, ...dataLoaderMocks },
      user.id,
    );

    expect(response).toEqual(true);
  });
});
