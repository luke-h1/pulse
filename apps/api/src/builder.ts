import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { Prisma } from '@prisma/client';
import db from './db';

interface Objects {
  // user queries
  UserResponse: {
    totalCount: number;
    results: PrismaTypes['User']['Shape'][];
    bannedUsersCount: number;
    onHoldUsersCount: number;
  };
  UsersResponse: {
    nextCursor: string;
    prevCursor: string;
    totalCount: number;
    results: PrismaTypes['User']['Shape'][];
  };
  ProjectsResponse: {
    nextCursor: string;
    prevCursor: string;
    totalCount: number;
    results: PrismaTypes['Project']['Shape'][];
  };
}

interface ISchemaBuilder {
  PrismaTypes: PrismaTypes;
  Context: {
    accessToken: string;
  };
  Objects: Objects;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: Prisma.JsonValue;
      Output: Prisma.JsonValue;
    };
  };
}

const builder = new SchemaBuilder<ISchemaBuilder>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});

export default builder;
