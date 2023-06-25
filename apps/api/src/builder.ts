import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import db from './db';

interface Objects {
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
}

interface ISchemaBuilder {
  PrismaTypes: PrismaTypes;
  Context: {
    accessToken: string;
  };
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: JSON;
      Output: JSON;
    };
  };
  Objects: Objects;
}

const builder = new SchemaBuilder<ISchemaBuilder>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});
export default builder;
