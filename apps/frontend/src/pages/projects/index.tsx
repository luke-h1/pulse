import {
  ProjectsQuery,
  SearchProjectsDocument,
  SearchProjectsQuery,
  SearchProjectsQueryVariables,
  useProjectsQuery,
} from '@graphql-hooks/generated';
import { withUrqlClient } from 'next-urql';
import { NextPage } from 'next';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { ChangeEvent, useState } from 'react';
import useDebouncedCallback from '@common/hooks/useDebouncedCallback';
import searchClient from '@frontend/utils/searchClient';
import Page from '@frontend/components/Page';
import {
  Button,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import Tag from '@frontend/components/Tag';
import ProjectCard from '@frontend/components/ProjectCard';

const ProjectPage: NextPage = () => {
  const [{ data, fetching }] = useProjectsQuery();
  const [selectedTag, setSelectedTag] = useState<string>();
  const [displayedProjects, setDisplayedProjects] = useState<
    ProjectsQuery | undefined
  >(data);

  const [onSearch] = useDebouncedCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 0) {
        const result = await searchClient.request<
          SearchProjectsQuery,
          SearchProjectsQueryVariables
        >(SearchProjectsDocument, {
          query: e.target.value,
        });

        setDisplayedProjects(result?.searchProjects as ProjectsQuery);
      }
    },
    800,
  );

  if (fetching) {
    return <Spinner />;
  }

  return (
    <Page
      seo={{
        title: 'Projects',
        description:
          'All types of projects about software development, programming, and related topics',
      }}
    >
      <VStack as="section" alignItems="flex-start" w="full" spacing={3}>
        <Heading size="md">Projects.</Heading>
        <Text fontSize="md">
          All types of projects about software development, programming, and
          related topics
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={HiOutlineSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            onChange={onSearch}
            placeholder="search projects"
            variant="filled"
          />
        </InputGroup>
      </VStack>
      {displayedProjects?.projects && displayedProjects.projects.length > 0 && (
        <HStack
          as="section"
          flexWrap="wrap"
          gridRowGap={2}
          w="full"
          spacing={3}
        >
          <Button
            textTransform="uppercase"
            colorScheme="purple"
            onClick={() => {}}
            size="xs"
            variant={!selectedTag ? 'solid' : 'ghost'}
          >
            All
          </Button>
          {displayedProjects.projects.map(project => {
            const tags = project.tags.map(tag => tag);
            return tags.map(tag => (
              <Tag
                key={tag}
                tag={tag}
                onClick={() => setSelectedTag(tag)}
                selectedTag={selectedTag as string}
              />
            ));
          })}
        </HStack>
      )}
      <List w="full" spacing={2}>
        {displayedProjects?.projects?.length &&
        displayedProjects.projects.length > 0 ? (
          displayedProjects.projects.map(project => (
            <ListItem key={project.id}>
              <ProjectCard project={project} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Text>No projects found.</Text>
          </ListItem>
        )}
      </List>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ProjectPage);
