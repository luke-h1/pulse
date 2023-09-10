import Hero from '@frontend/components/Hero';
import Page from '@common/components/Page';
import PostsSection from '@frontend/components/PostsSection';
import ProjectsSection from '@frontend/components/ProjectsSection';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import {
  useRecentPostsQuery,
  useRecentProjectsQuery,
} from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { Spinner } from '@chakra-ui/react';

const Home: NextPage = () => {
  const [{ data, fetching: postFetching }] = useRecentPostsQuery();
  const [{ data: projectsData, fetching: projectFetching }] =
    useRecentProjectsQuery();

  return (
    <Page
      site="frontend"
      seo={{
        title: 'Home',
        description:
          'Pulse is a platform for developers to share their knowledge and connect with other developers.',
      }}
    >
      <Hero />
      {postFetching ? <Spinner /> : <PostsSection posts={data?.recentPosts} />}
      {projectFetching ? (
        <Spinner />
      ) : (
        <ProjectsSection projects={projectsData?.recentProjects} />
      )}
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
