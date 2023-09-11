import { NextPage } from 'next/types';
import Page from '@common/components/Page';
import AuthGuard from '@frontend/components/AuthGuard';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@common/urql/createUrqlClient';

const Home: NextPage = () => {
  return (
    <Page
      seo={{
        title: 'Home',
        description: 'Admin home page',
      }}
      site="admin"
    >
      <AuthGuard>
        <h1>admin</h1>
      </AuthGuard>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
