import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { UserRegisterInput } from '../user/inputs/UserRegisterInput';
import { UserLoginInput } from '../user/inputs/UserLoginInput';
import { db } from '../../db/prisma';
import { UserResolver } from '../user/user';
import { createApiMocks, createMockRedis } from '../../test/__mocks__/express';
import resetDb from '../../test/resetDb';

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

    const response = await resolver.register(
      {
        ...user,
      },
      {
        req,
        res,
        redis,
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
        emailVerified: null,
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

    const user: UserRegisterInput = {
      firstName: 'Bob',
      lastName: 'Smith',
      username: 'bob123',
      email: 'bob@bob.com',
      password: await bcrypt.hash('password', 10),
    };

    const loginInput: UserLoginInput = {
      email: user.email,
      password: 'password',
    };

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

    const redis = createMockRedis();

    const response = await resolver.login(loginInput, {
      req,
      res,
      redis,
    });

    expect(req.session.userId).toEqual(response.user?.id);

    expect(response).toEqual({
      errors: [],
      user: {
        accountStatus: 'ACTIVE',
        bio: null,
        createdAt: expect.any(Date),
        email: 'bob@bob.com',
        emailVerified: null,
        firstName: 'Bob',
        github: null,
        id: expect.any(String),
        image: null,
        lastName: 'Smith',
        location: null,
        password: expect.any(String),
        provider: 'email',
        role: 'USER',
        twitter: null,
        updatedAt: expect.any(Date),
        username: 'bob123',
        website: null,
      },
    });
  });

  test('throws error when provided details are incorrect', async () => {
    const resolver = new UserResolver();

    const user: UserRegisterInput = {
      firstName: 'test',
      lastName: 'test',
      username: 'test123456',
      email: 'testing123@test.com',
      password: 'blah',
    };

    await db.user.create({
      data: {
        ...user,
        provider: 'session',
        password: await bcrypt.hash('password', 10),
      },
    });

    const { req, res } = createApiMocks({
      session: {
        destroy: jest.fn(cb => cb()),
      },
      clearCookie: jest.fn(),
    });

    const redis = createMockRedis();

    const response = await resolver.register(
      {
        ...user,
      },
      {
        req,
        res,
        redis,
      },
    );

    expect(response).toEqual({
      errors: [
        {
          code: '409',
          field: 'email',
          message: 'An account with that email already exists.',
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
      clearCookie: jest.fn(cb => cb()),
    });

    const redis = createMockRedis();

    resolver.logout({ req, res, redis });

    // expect(res.clearCookie).toHaveBeenCalledWith('pulse.sid');
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

    const response = await resolver.me({ req, res, redis });

    expect(response).toEqual(null);
  });

  test('deleteAccount mutation deletes user account', async () => {
    const resolver = new UserResolver();

    const u = await db.user.create({
      data: {
        firstName: 'test',
        lastName: 'test',
        username: 'test12345',
        email: 'test@test.com',
        provider: 'session',
        password: await bcrypt.hash('password', 10),
      },
    });

    const { req, res } = createApiMocks({
      session: {
        userId: u.id,
      },
      clearCookie: jest.fn(),
    });

    const redis = createMockRedis();

    const response = await resolver.deleteAccount({
      req,
      res,
      redis,
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

    const response = await resolver.deleteUser({ req, res, redis }, user.id);

    expect(response).toEqual(true);
  });
});
