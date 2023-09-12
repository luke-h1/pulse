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
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { FieldError } from '../../fields/FieldError';
import { AccountStatus, Role, User } from '../../prisma/generated/type-graphql';
import { Context } from '../../types/Context';
import isAuth from '../../middleware/isAuth';
import { db } from '../../db/prisma';
import { isAdmin } from '../../middleware/isAdmin';
import { UserRegisterInput } from './inputs/UserRegisterInput';
import isErrorLike from '../../utils/isErrorLike';
import { UserLoginInput } from './inputs/UserLoginInput';
import config from '../../utils/config';
import { UserUpdateInput } from './inputs/UserUpdateInput';
import { IdsResponse } from '../post/post';
import logger from '../../utils/logger';

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @Authorized(isAuth)
  async me(@Ctx() { req }: Context) {
    return db.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });
  }

  @FieldResolver(() => String)
  fullName(@Root() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }

  @Query(() => User, { nullable: true })
  @Authorized(isAdmin)
  user(@Arg('id', () => String) id: string) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UserRegisterInput,
    @Ctx() { req }: Context,
  ): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(options.password, 10);

    try {
      const userExists = await db.user.findUnique({
        where: {
          email: options.email,
        },
      });

      if (userExists) {
        return {
          errors: [
            {
              field: 'email',
              message: 'An account with this email already exists.',
              code: '409',
            },
          ],
        };
      }

      const user = await db.user.create({
        data: {
          ...options,
          password: hashedPassword,
          provider: 'session',
        },
      });

      // eslint-disable-next-line no-param-reassign
      req.session.userId = user.id;

      return {
        user,
        errors: [],
      };
    } catch (e: unknown) {
      if (isErrorLike(e)) {
        return {
          errors: [
            {
              field: 'email',
              message: e.message,
            },
          ],
        };
      }
    }

    return {
      errors: [
        {
          field: 'email',
          message: 'An unknown error occurred.',
          code: '500',
        },
      ],
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UserLoginInput,
    @Ctx() { req }: Context,
  ): Promise<UserResponse> {
    const user = await db.user.findUnique({
      where: {
        email: options.email,
      },
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Invalid email or password.',
            code: '401',
          },
        ],
      };
    }

    if (user.accountStatus === 'BANNED' || user.accountStatus === 'ON_HOLD') {
      return {
        errors: [
          {
            field: 'email',
            message: 'Your account has been suspended.',
            code: '403',
          },
        ],
      };
    }

    const valid = await bcrypt.compare(options.password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Invalid email or password.',
            code: '401',
          },
        ],
      };
    }

    // eslint-disable-next-line no-param-reassign
    req.session.userId = user.id;

    return {
      user,
      errors: [],
    };
  }

  @Mutation(() => UserResponse)
  async adminLogin(
    @Arg('options') options: UserLoginInput,
    @Ctx() { req }: Context,
  ): Promise<UserResponse> {
    const user = await db.user.findUnique({
      where: {
        email: options.email,
      },
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Invalid email or password.',
            code: '401',
          },
        ],
      };
    }

    if (user.accountStatus === 'BANNED' || user.accountStatus === 'ON_HOLD') {
      return {
        errors: [
          {
            field: 'email',
            message: 'Your account has been suspended.',
            code: '403',
          },
        ],
      };
    }

    const valid = await bcrypt.compare(options.password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Invalid email or password.',
            code: '401',
          },
        ],
      };
    }

    if (user.role !== Role.ADMIN) {
      const res = await db.adminReport.create({
        data: {
          title: `User ${user.id} attempted to login as an admin.`,
          content: {
            id: 'OpE2kPz9cJ',
            data: {
              text: `The user ${user.firstName} attempted to login to the admin app instead of using the frontend app. This exception was caugh in the \`adminLogin\` mutation.`,
            },
            type: 'paragraph',
          },
        },
      });

      logger.warn(
        `User ${user.id} attempted to login to the admin app instead of using the frontend app. This exception was caugh in the \`adminLogin\` mutation. Created report ${res.id} `,
      );

      return {
        errors: [
          {
            field: 'email',
            message: 'You are not authorized to access this page.',
            code: '403',
          },
        ],
      };
    }

    // eslint-disable-next-line no-param-reassign
    req.session.userId = user.id;

    return {
      user,
      errors: [],
    };
  }

  @Query(() => [User])
  @Authorized(isAdmin)
  async users(): Promise<User[]> {
    return db.user.findMany({
      include: {
        posts: true,
        projects: true,
        reports: true,
      },
    });
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise(resolve =>
      // eslint-disable-next-line consistent-return
      req.session.destroy(e => {
        res.clearCookie(config.COOKIE_NAME);
        if (e) {
          resolve(false);
          return {
            errors: [
              {
                message: e.message,
              },
            ],
          };
        }
        resolve(true);
      }),
    );
  }

  @Mutation(() => Boolean)
  @Authorized(isAuth)
  async deleteAccount(@Ctx() { req }: Context): Promise<boolean> {
    const user = await db.user.delete({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(isAdmin)
  async deleteUser(
    @Ctx() { req }: Context,
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    const isMatchingId = req.session.userId === id;

    if (isMatchingId) {
      throw new GraphQLError(
        'You cannot delete your own account. Use the `deleteAccount` mutation for this',
      );
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    return true;
  }

  @Mutation(() => UserResponse)
  @Authorized(isAuth)
  async updateUserDetails(
    @Ctx() { req }: Context,
    @Arg('options', () => UserUpdateInput) options: UserUpdateInput,
  ): Promise<UserResponse> {
    const user = await db.user.update({
      where: {
        id: req.session.userId,
      },
      data: {
        ...options,
      },
    });

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  @Authorized(isAdmin)
  async updateUserRole(
    @Arg('id', () => String) id: string,
    @Arg('role', () => Role) role: Role,
  ): Promise<UserResponse> {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  @Authorized(isAdmin)
  async updateUserStatus(
    @Arg('id', () => String) id: string,
    @Arg('status', () => AccountStatus) status: AccountStatus,
  ): Promise<UserResponse> {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        accountStatus: status,
      },
    });

    return {
      user,
    };
  }

  @Mutation(() => IdsResponse, {
    description: 'Returns all user ids',
    nullable: true,
  })
  async userSlugs(): Promise<IdsResponse> {
    const users = await db.user.findMany({
      select: {
        id: true,
      },
    });

    return {
      ids: users && users.map(({ id }) => id),
    };
  }
}
