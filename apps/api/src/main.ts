import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import builder from './builder';

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:4000',
  'https://studio.apollographql.com',
];

const PROD_ORIGINS = [''];

const apolloServer = new ApolloServer({
  schema: builder.toSchema(),
  context: async ({ req }) => {
    return {
      accessToken: req?.headers?.authorization,
    };
  },
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
  });
});

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ type: 'application/json', limit: '50mb' }));

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API started on http://localhost:${process.env.PORT}/graphql`);
});
