import Hero from '@frontend/components/Hero';
import Page from '@frontend/components/Page';
import PostsSection from '@frontend/components/PostsSection';
import ProjectsSection from '@frontend/components/ProjectsSection';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { usePostsQuery, useProjectsQuery } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();
  const [{ data: projectsData }] = useProjectsQuery();

  return (
    <Page>
      <Hero />
      <PostsSection posts={data?.posts} />
      <ProjectsSection projects={projectsData?.projects} />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
