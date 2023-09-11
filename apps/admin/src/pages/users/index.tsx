import Page from '@common/components/Page';

const UsersPage = () => {
  return (
    <Page
      site="admin"
      seo={{
        title: 'Users',
        description: 'Users page',
      }}
    >
      <h1>Users</h1>
    </Page>
  );
};
export default UsersPage;
