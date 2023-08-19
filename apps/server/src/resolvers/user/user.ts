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
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { FieldError } from '../../utils/FieldError';
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
import { SlugsResponse } from '../post/post';

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
      if ((e as { code: string }).code === 'P2002') {
        return {
          errors: [
            {
              field: 'email',
              message: 'An account with that email already exists.',
              code: '409',
            },
          ],
        };
      }

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

  @Mutation(() => SlugsResponse, {
    description: 'Returns all user slugs',
    nullable: true,
  })
  async userSlugs(): Promise<SlugsResponse> {
    const slugs = await db.user.findMany({
      select: {
        id: true,
      },
    });

    return {
      slugs: slugs && slugs.map(({ id }) => id),
    };
  }
}
