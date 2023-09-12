import { Heading } from '@chakra-ui/react';
import Page from '@common/components/Page';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import PostsSection from '@common/components/PostsSection';
import {
  Status,
  usePostsQuery,
  useProjectsQuery,
} from '@graphql-hooks/generated';

const ManagePosts = () => {
  const [{ data: postsData }] = useAdminPostsQuery();
  return (
    <Page
      site="admin"
      seo={{
        title: 'Manage posts',
        description: 'Manage posts',
      }}
    >
      <Heading>Manage Posts</Heading>
      <PostsSection projects={postsData?.posts} title="Recent Projects" />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(ManagePosts);
