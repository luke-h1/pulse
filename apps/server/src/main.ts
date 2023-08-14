import 'reflect-metadata';
import 'dotenv/config';
import http from 'http';
import express from 'express';
import session from 'express-session';
import compression from 'compression';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { json } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloArmor } from '@escape.tech/graphql-armor';
import redis from './db/redis';
import buildCookieOptions from './utils/buildCookieOptions';
import createSchema from './utils/createSchema';
import logger from './utils/logger';
import config from './utils/config';

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3005',
  'https://studio.apollographql.com',
];

const PROD_ORIGINS = [''];

const main = async () => {
  const app = express();
  app.set('trust proxy', 1);
  const httpServer = http.createServer(app);

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

  const armor = new ApolloArmor();
  const protection = armor.protect();

  const apolloServer = new ApolloServer({
    plugins: [
      ...protection.plugins,
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    allowBatchedHttpRequests: true,
    schema: await createSchema(),
    csrfPrevention: process.env.NODE_ENV === 'production',
  });

  await apolloServer.start();

  app.use(
    '/api/graphql',
    cors<cors.CorsRequest>({
      origin:
        process.env.NODE_ENV === 'production' ? PROD_ORIGINS : DEV_ORIGINS,
      credentials: true,
    }),
    json({
      limit: '50mb',
    }),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res, redis }),
    }),
  );

  await new Promise<void>(resolve =>
    httpServer.listen({ port: process.env.PORT }, resolve),
  );
  logger.info(
    `Server listening on http://localhost:${process.env.PORT}/api/graphql`,
  );
};

main().catch(e => logger.error(e));
