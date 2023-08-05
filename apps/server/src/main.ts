import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import redis from './db/redis';
import buildCookieOptions from './utils/buildCookieOptions';
import { isProd } from './utils/isProd';
import createSchema from './utils/createSchema';
import logger from './utils/logger';
import config from './utils/config';

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:4000',
  'https://studio.apollographql.com',
];

const PROD_ORIGINS = [''];

const main = async () => {
  const app = express();

  app.use(compression());

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: config.COOKIE_NAME,
      proxy: true,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: buildCookieOptions(),
    }),
  );

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'production' ? PROD_ORIGINS : DEV_ORIGINS,
    }),
  );

  const apolloServer = new ApolloServer({
    plugins: [],
    debug: !!isProd,
    allowBatchedHttpRequests: true,
    schema: await createSchema(),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/api',
  });

  app.listen(process.env.PORT, () => {
    logger.info(
      `API started on http://localhost:${process.env.PORT}/api/graphql`,
    );
  });
};

main().catch(e => logger.error(e));
