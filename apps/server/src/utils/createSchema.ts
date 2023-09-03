import { buildSchema } from 'type-graphql';
import isAuth from '../middleware/isAuth';
import { UserResolver } from '../resolvers/user/user';
import { PostResolver } from '../resolvers/post/post';
import { ProjectResolver } from '../resolvers/project/project';
import { HealthResolver } from '../resolvers/health/health';
import { ImageResolver } from '../resolvers/image/image';

const createSchema = async () => {
  return buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
      ProjectResolver,
      HealthResolver,
      ImageResolver,
    ],
    validate: false,
    emitSchemaFile: true,
    authChecker: isAuth,
  });
};
export default createSchema;
