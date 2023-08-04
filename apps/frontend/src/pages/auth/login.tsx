import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';

const LoginPage: NextPage = () => {
  return <div>login page</div>;
};
export default withUrqlClient(createUrqlClient, { ssr: true })(LoginPage);
