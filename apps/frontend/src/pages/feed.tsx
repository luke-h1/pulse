import { Spinner } from '@chakra-ui/react';
import Page from '@common/components/Page';
import PostsSection from '@common/components/PostsSection';
import ProjectsSection from '@common/components/ProjectsSection';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import {
  useRecentPostsQuery,
  useRecentProjectsQuery,
} from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';

const FeedPage: NextPage = () => {
  const [{ data, fetching: postFetching }] = useRecentPostsQuery();
  const [{ data: projectsData, fetching: projectFetching }] =
    useRecentProjectsQuery();

  return (
    <Page
      site="frontend"
      seo={{
        title: 'Feed',
        description:
          'Pulse is a platform for developers to share their knowledge and connect with other developers.',
      }}
    >
      {postFetching ? (
        <Spinner />
      ) : (
        <PostsSection posts={data?.recentPosts} title="Posts" />
      )}
      {projectFetching ? (
        <Spinner />
      ) : (
        <ProjectsSection
          projects={projectsData?.recentProjects}
          title="Projects"
        />
      )}
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(FeedPage);
