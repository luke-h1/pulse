import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateResolver } from 'graphql-scalars';
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
}

interface ISchemaBuilder {
  PrismaTypes: PrismaTypes;
  Context: {
    accessToken: string;
  };
  Scalars: {
    Date: { Input: Date; Output: Date };
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

builder.addScalarType('Date', DateResolver, {
  description: 'Date custom scalar type',
});

export default builder;
