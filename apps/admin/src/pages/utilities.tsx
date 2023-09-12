import AuthGuard from '@admin/components/AuthGuard';
import Page from '@common/components/Page';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const UtilityPage = () => {
  return (
    <AuthGuard>
      <Page
        site="admin"
        seo={{
          title: 'Common Utilities',
          description: 'Common utility page',
        }}
      >
        <h1>Utilities</h1>
      </Page>
    </AuthGuard>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(UtilityPage);
