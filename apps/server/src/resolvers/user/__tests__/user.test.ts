import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UserRegisterInput } from '../inputs/UserRegisterInput';
import { UserLoginInput } from '../inputs/UserLoginInput';
import { db } from '../../../db/prisma';
import { UserResolver } from '../user';
import { Context } from '../../../types/Context';

beforeEach(async () => {
  await db.$queryRaw(
    Prisma.sql`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
  );
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

    const req = {
      session: {
        destroy: jest.fn(cb => cb()),
      },
    } as unknown as Context['req'];

    const res = {
      clearCookie: jest.fn(),
    } as unknown as Context['res'];

    const mockRedis = {
      del: jest.fn(),
    } as unknown as Context['redis'];

    const response = await resolver.register(
      {
        ...user,
      },
      {
        req,
        res,
        redis: mockRedis,
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

    const req = {
      session: {
        destroy: jest.fn(cb => cb()),
      },
    } as unknown as Context['req'];

    const res = {
      clearCookie: jest.fn(),
    } as unknown as Context['res'];

    const mockRedis = {
      del: jest.fn(),
    } as unknown as Context['redis'];

    const response = await resolver.login(loginInput, {
      req,
      res,
      redis: mockRedis,
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

  test('logs user out and destroys cookie', async () => {
    const resolver = new UserResolver();

    const req = {
      session: {
        destroy: jest.fn(cb => cb()),
      },
    } as unknown as Context['req'];

    const res = {
      clearCookie: jest.fn(),
    } as unknown as Context['res'];

    const mockRedis = {
      del: jest.fn(),
    } as unknown as Context['redis'];

    resolver.logout({ req, res, redis: mockRedis });

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalledWith('pulse.sid');
  });
});
