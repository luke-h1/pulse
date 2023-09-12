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
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import redis from './db/redis';
import buildCookieOptions from './utils/buildCookieOptions';
import createSchema from './utils/createSchema';
import logger from './utils/logger';
import config from './utils/config';
import createUserDataLoader from './dataloader/createUserLoader';
import createPostLoader from './dataloader/createPostLoader';
import createProjectLoader from './dataloader/createProjectLoader';

const DEV_ORIGINS = [
  'http://localhost:3000', // frontend
  'http://localhost:4000', // admin
  'http://localhost:4002', // frontend2
  'https://studio.apollographql.com',
];

const PROD_ORIGINS = ['https://studio.apollographql.com'];

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
      ApolloServerPluginLandingPageLocalDefault({
        footer: false,
        includeCookies: true,
      }),
    ],
    schema: await createSchema(),
    csrfPrevention: process.env.NODE_ENV === 'production',
    status400ForVariableCoercionErrors: true,
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
      context: async ({ req, res }) => ({
        req,
        res,
        redis,
        userLoader: createUserDataLoader(),
        postLoader: createPostLoader(),
        projectLoader: createProjectLoader(),
      }),
    }),
  );

  await new Promise<void>(resolve =>
    httpServer.listen({ port: process.env.PORT }, resolve),
  );

  logger.info(
    `Server started on http://localhost:${process.env.PORT}/api/graphql `,
  );
};

main().catch(e => logger.error(e));
