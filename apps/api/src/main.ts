import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import logger from './lib/logger';
import { schema } from './schema';

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:4000',
  'https://studio.apollographql.com',
];

const PROD_ORIGINS = [''];

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      accessToken: req?.headers?.authorization,
    };
  },
  plugins: [],
});

const app = express();

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin:
        process.env.NODE_ENV === 'production' ? PROD_ORIGINS : DEV_ORIGINS,
      credentials: true,
    },
    path: '/api/graphql',
    __internal_healthCheckPath: '/api/health',
  });
});

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ type: 'application/json', limit: '50mb' }));

app.listen(process.env.PORT, () => {
  logger.info(
    `API started on http://localhost:${process.env.PORT}/api/graphql`,
  );
});
