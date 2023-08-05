import { AuthChecker } from 'type-graphql';
import { Context } from '../types/Context';

const isAuth: AuthChecker<Context> = ({ context }) => {
  const { userId } = context.req.session;
  return !!userId;
};
export default isAuth;
