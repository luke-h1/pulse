import { Heading } from '@chakra-ui/react';
import Page from '@common/components/Page';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import ProjectsSection from '@common/components/ProjectsSection';
import { useProjectsQuery } from '@graphql-hooks/generated';

const ManageProjects = () => {
  const [{ data: projectsData }] = useProjectsQuery();
  return (
    <Page
      site="admin"
      seo={{
        title: 'Manage Projects',
        description: 'Manage Projects',
      }}
    >
      <Heading>Manage Projects</Heading>
      <ProjectsSection
        projects={projectsData?.projects}
        title="Recent Projects"
      />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(ManageProjects);
