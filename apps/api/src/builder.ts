import SchemaBuilder from '@pothos/core';
import DirectivePlugin from '@pothos/plugin-directives';
import MocksPlugin from '@pothos/plugin-mocks';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import TracingPlugin, { wrapResolver } from '@pothos/plugin-tracing';
import { Prisma } from '@prisma/client';
import db from './db';
import logger from './lib/logger';

interface Paging {
  totalCount: number;
  prevCursor: string;
  nextCursor: string;
}

interface Objects {
  // user queries
  UserResponse: {
    totalCount: number;
    results: PrismaTypes['User']['Shape'][];
    bannedUsersCount: number;
    onHoldUsersCount: number;
  };
  UsersResponse: {
    results: PrismaTypes['User']['Shape'][];
  } & Paging;
  // project queries
  ProjectsResponse: {
    results: PrismaTypes['Project']['Shape'][];
  } & Paging;
  // post queries
  PostsResponse: {
    results: PrismaTypes['Post']['Shape'][];
  } & Paging;
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
  plugins: [PrismaPlugin, TracingPlugin, DirectivePlugin, MocksPlugin],
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
