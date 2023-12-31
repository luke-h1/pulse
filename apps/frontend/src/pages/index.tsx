import Hero from '@frontend/components/Hero';
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

const Home: NextPage = () => {
  const [{ data }] = useRecentPostsQuery();
  const [{ data: projectsData }] = useRecentProjectsQuery();

  return (
    <Page
      site="frontend"
      seo={{
        title: 'Home',
        description:
          'Pulse is a platform for developers to share their knowledge and connect with other developers.',
      }}
    >
      <>
        <Hero />
        <PostsSection posts={data?.recentPosts} title="Recent Posts" />
        <ProjectsSection
          projects={projectsData?.recentProjects}
          title="Recent Projects"
        />
      </>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
