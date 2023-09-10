import { HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import FormattedDate from '@common/components/FormattedDate';
import { PostQuery } from '@graphql-hooks/generated';
import { ScrollToTop } from '@ui/components';
import dynamic from 'next/dynamic';

interface Props {
  post: PostQuery['post'];
}

const EditorOutput = dynamic(() => import('@editor/renderers/EditorOutput'), {
  ssr: false,
});

const PostPage = ({ post }: Props) => {
  return (
    <>
      <VStack position="relative" alignItems="stretch" w="full" spacing={8}>
        <VStack alignItems="flex-start" spacing={3}>
          <Heading as="h1" size="lg">
            {post?.title}
          </Heading>
          <HStack
            divider={
              <Text mx={2} color="gray.500">
                •
              </Text>
            }
          >
            <Text color="gray.500" fontSize="sm">
              <FormattedDate>{post?.createdAt}</FormattedDate>
            </Text>
            <Text color="gray.500" fontSize="sm">
              {post?.authorFullName}
            </Text>
          </HStack>
        </VStack>
        <Image src={post?.image as string} alt={post?.title} />
        <EditorOutput content={post?.content} />
      </VStack>
      <ScrollToTop />
    </>
  );
};
export default PostPage;
