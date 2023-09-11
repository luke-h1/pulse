import { NextPage } from 'next/types';
import Page from '@common/components/Page';
import AuthGuard from '@frontend/components/AuthGuard';

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
export default Home;
