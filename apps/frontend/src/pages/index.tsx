import Hero from '@frontend/components/Hero';
import Page from '@frontend/components/Page';
import PostsSection from '@frontend/components/PostsSection';
import ProjectsSection from '@frontend/components/ProjectsSection';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import {
  useRecentPostsQuery,
  useRecentProjectsQuery,
} from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';

const Home: NextPage = () => {
  // const [{ data }] = useRecentPostsQuery();
  // const [{ data: projectsData }] = useRecentProjectsQuery();

  return (
    <Page>
      <Hero />
      {/* <PostsSection posts={data?.recentPosts} />
      <ProjectsSection projects={projectsData?.recentProjects} /> */}
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
