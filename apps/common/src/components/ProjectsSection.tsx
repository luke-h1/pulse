import { GridItem, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { ProjectsQuery } from '@graphql-hooks/generated';
import ProjectCard from './ProjectCard';

interface Props {
  projects?: ProjectsQuery['projects'];
  title: string;
}

const ProjectsSection = ({ projects, title }: Props) => {
  return (
    <VStack as="section" alignItems="flex-start" w="full" spacing={4}>
      <Heading size="md">{title}</Heading>
      <SimpleGrid
        rowGap={8}
        columnGap={12}
        w="full"
        columns={{ base: 1, md: 2 }}
        spacing={6}
      >
        {projects?.length && projects.length > 0 ? (
          projects?.map(project => (
            <GridItem key={project.id} as="article">
              <ProjectCard project={project} key={project.id} />
            </GridItem>
          ))
        ) : (
          <Text>No projects found.</Text>
        )}
      </SimpleGrid>
    </VStack>
  );
};
export default ProjectsSection;
