import { HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import FormattedDate from '@common/components/FormattedDate';
import EditorOutput from '@editor/renderers/EditorOutput';
import { ProjectQuery } from '@graphql-hooks/generated';
import { ScrollToTop } from '@ui/components';

interface Props {
  project: ProjectQuery['project'];
}

const ProjectPage = ({ project }: Props) => {
  return (
    <>
      <VStack position="relative" alignItems="stretch" w="full" spacing={8}>
        <VStack alignItems="flex-start" spacing={3}>
          <Heading as="h1" size="lg">
            {project?.title}
          </Heading>
          <HStack
            divider={
              <Text mx={2} color="gray.500">
                •
              </Text>
            }
          >
            <Text color="gray.500" fontSize="sm">
              <FormattedDate>{project?.createdAt}</FormattedDate>
            </Text>
          </HStack>
          <HStack>
            <Text color="gray.500" fontSize="sm">
              {project?.appStoreUrl && (
                <a
                  href={project?.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store
                </a>
              )}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {project?.playStoreUrl && (
                <a
                  href={project?.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play Store
                </a>
              )}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {project?.githubUrl && (
                <a
                  href={project?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Repository
                </a>
              )}
              <Text color="gray.500" fontSize="sm">
                {project?.siteUrl && (
                  <a
                    href={project?.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Site Url
                  </a>
                )}
              </Text>
            </Text>
          </HStack>
        </VStack>
        <Image src={project?.image as string} alt={project?.title} />
        <EditorOutput content={project?.content} />
      </VStack>
      <ScrollToTop />
    </>
  );
};
export default ProjectPage;
