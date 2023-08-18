import { graphql, GraphQLSchema } from 'graphql';
import createSchema from '../utils/createSchema';

interface Options {
  source: string;
  variableValues?: { [key: string]: unknown };
  userId?: string;
}

let schema: GraphQLSchema;

const graphqlCall = async ({ source, userId, variableValues }: Options) => {
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
          destroy: jest.fn(),
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};

export default graphqlCall;
