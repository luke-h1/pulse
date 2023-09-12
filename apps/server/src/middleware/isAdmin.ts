import { AuthChecker } from 'type-graphql';
import { Role } from '@prisma/client';
import { Context } from '../types/Context';
import { db } from '../db/prisma';

export const isAdmin: AuthChecker<Context> = async ({ context }) => {
  const user = await db.user.findFirst({
    where: {
      id: context.req.session.userId,
    },
  });

  if (user?.role === Role.ADMIN) {
    return true;
  }

  return false;
};
