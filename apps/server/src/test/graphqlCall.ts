import { graphql, GraphQLSchema } from 'graphql';
import createSchema from '../utils/createSchema';

export type Maybe<T> = T | null | undefined;

export type InputType<T> = {
  [K in keyof T]: unknown;
};

interface Options {
  source: string;
  variableValues?: { [key: string]: unknown };
  userId?: string;
}

let schema: GraphQLSchema;

const graphqlCall = async <T>({ source, userId, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};

export default graphqlCall;
