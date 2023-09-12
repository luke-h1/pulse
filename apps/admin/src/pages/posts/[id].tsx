import Page from '@common/components/Page';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const ManagePost = () => {
  return (
    <Page
      site="admin"
      seo={{
        title: 'Manage Post',
        description: 'Manage Post',
      }}
    >
      <h1>Manage post</h1>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(ManagePost);
