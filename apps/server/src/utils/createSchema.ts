import { buildSchema } from 'type-graphql';
import { HealthResolver } from '../resolvers/health';
import isAuth from '../middleware/isAuth';
import { UserResolver } from '../resolvers/user/user';

const createSchema = async () => {
  return buildSchema({
    resolvers: [HealthResolver, UserResolver],
    validate: false,
    container: ({ context }) => context.container,
    emitSchemaFile: true,
    authChecker: isAuth,
  });
};
export default createSchema;
