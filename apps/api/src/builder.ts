import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import TracingPlugin, { wrapResolver } from '@pothos/plugin-tracing';
import { Prisma } from '@prisma/client';
import db from './db';
import logger from './lib/logger';

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
  PostsResponse: {
    nextCursor: string;
    prevCursor: string;
    totalCount: number;
    results: PrismaTypes['Post']['Shape'][];
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
      Input: Prisma.InputJsonValue;
      Output: Prisma.InputJsonValue;
    };
  };
}

const builder = new SchemaBuilder<ISchemaBuilder>({
  plugins: [PrismaPlugin, TracingPlugin],
  prisma: {
    client: db,
  },
  tracing: {
    default: true,
    wrap: (resolver, _options, config) =>
      wrapResolver(resolver, (error, duration) => {
        logger.info(
          `Executed resolver ${config.parentType}.${config.name} in ${duration}ms`,
        );

        if (error) {
          logger.error(error);
        }
      }),
  },
});

export default builder;
