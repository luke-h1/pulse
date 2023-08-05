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
import { User } from '../../prisma/src/generated/type-graphql';
import { Context } from '../../types/Context';
import isAuth from '../../middleware/isAuth';
import { db } from '../../db/prisma';
import { isAdmin } from '../../middleware/isAdmin';
import { UserRegisterInput } from './inputs/UserRegisterInput';
import isErrorLike from '../../utils/isErrorLike';
import { UserLoginInput } from './inputs/UserLoginInput';
import config from '../../utils/config';

@ObjectType()
class UserResponse {
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
      };
    } catch (e: unknown) {
      if ((e as { code: string }).code === 'P2002') {
        return {
          errors: [
            {
              field: 'email',
              message: 'An account with that email already exists.',
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
          },
        ],
      };
    }

    // eslint-disable-next-line no-param-reassign
    req.session.userId = user.id;

    return {
      user,
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
    await db.user.delete({
      where: {
        id: req.session.userId,
      },
    });

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
}
