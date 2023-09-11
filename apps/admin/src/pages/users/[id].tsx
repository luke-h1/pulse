import Page from '@common/components/Page';

const UserPage = () => {
  return (
    <Page
      site="admin"
      seo={{
        title: 'User',
        description: 'User page',
      }}
    >
      <h1>Users</h1>
    </Page>
  );
};
export default UserPage;
