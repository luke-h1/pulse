import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  db: PrismaClient;
  accessToken: string;
}
