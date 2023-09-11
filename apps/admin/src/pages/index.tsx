import { NextPage } from 'next/types';
import Page from '@common/components/Page';
import AuthGuard from '@frontend/components/AuthGuard';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@common/urql/createUrqlClient';

const Home: NextPage = () => {
  return (
    <AuthGuard>
      <Page
        seo={{
          title: 'Home',
          description: 'Admin home page',
        }}
        site="admin"
      >
        <h1>admin</h1>
      </Page>
    </AuthGuard>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
