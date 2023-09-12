import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArrayElementType } from '@common/types/util';
import {
  ProjectsQuery,
  useDeleteProjectMutation,
} from '@graphql-hooks/generated';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  project: ArrayElementType<ProjectsQuery['projects']>;
}

const ProjectCard = ({ project }: Props) => {
  const [, deleteProjectMutation] = useDeleteProjectMutation();

  const handleDeleteProject = async () => {
    // eslint-disable-next-line no-alert
    alert('Are you sure you want to delete this project?');
    await deleteProjectMutation({
      id: project.id,
    });
  };

  return (
    <LinkBox zIndex="dropdown">
      <VStack alignItems="flex-start" spacing={4}>
        <AspectRatio
          position="relative"
          overflow="hidden"
          w="full"
          ratio={16 / 9}
          role="group"
          rounded="lg"
        >
          <>
            <LinkOverlay href={`/projects/${project.id}`}>
              <Flex
                position="absolute"
                zIndex="docked"
                align="center"
                justify="center"
                bg="transparent"
                _groupHover={{
                  bg: 'blackAlpha.500',
                }}
                inset={0}
                transitionDuration="slow"
                transitionProperty="background"
                transitionTimingFunction="ease-out"
              />
            </LinkOverlay>
            {project.image && (
              <Image
                alt={`Thumbnail of project ${project.title}`}
                src={project.image}
                width={360}
                height={202}
                objectFit="cover"
                placeholder="blur"
                blurDataURL={project.image}
              />
            )}
          </>
        </AspectRatio>{' '}
        <VStack alignItems="flex-start" spacing={2}>
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
          <Text color="gray.500" fontSize="sm">
            {project.intro}
          </Text>
        </VStack>
        <Box p={{ base: 0, full: 4 }} w="full">
          {project.isAuthor && (
            <ButtonGroup>
              <Button
                as={Link}
                href={`/projects/${project.id}/update`}
                size="sm"
              >
                Edit project
              </Button>
              <Button size="sm" color="red.500" onClick={handleDeleteProject}>
                Delete project
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </VStack>
    </LinkBox>
  );
};
export default ProjectCard;
