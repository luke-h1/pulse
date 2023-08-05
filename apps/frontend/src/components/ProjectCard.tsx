import {
  AspectRatio,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ProjectsQuery } from '@graphql-hooks/generated';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  project: ProjectsQuery['projects']
}

const ProjectCard = ({ project }: Props) => {
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
            <LinkOverlay href={`/projects/${project.slug}`}>
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
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          <Text color="gray.500" fontSize="sm">
            {project.intro}
          </Text>
        </VStack>
      </VStack>
    </LinkBox>
  );
};
export default ProjectCard;
