import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';

const RegisterPage: NextPage = () => {
  return <div>register page</div>;
};
export default withUrqlClient(createUrqlClient, { ssr: true })(RegisterPage);
