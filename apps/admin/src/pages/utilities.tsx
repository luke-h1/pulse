import AuthGuard from '@admin/components/AuthGuard';
import { ButtonGroup } from '@chakra-ui/react';
import Page from '@common/components/Page';

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
export default UtilityPage;
