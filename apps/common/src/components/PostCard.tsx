import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import FormattedDate from '@common/components/FormattedDate';
import {
  RecentPostsQuery,
  useDeletePostMutation,
} from '@graphql-hooks/generated';
import { ArrayElementType } from '@common/types/util';

interface Props {
  post: ArrayElementType<RecentPostsQuery['recentPosts']>;
}

const PostCard = ({ post }: Props) => {
  const [, deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    // eslint-disable-next-line no-alert
    alert('Are you sure you want to delete this post?');
    await deletePost({
      id: post.id,
    });
  };

  return (
    <LinkBox as="article">
      <VStack
        alignItems="stretch"
        w="full"
        p={{ base: 0, md: 4 }}
        _hover={{ bg: 'gray.100', transform: 'scale(1.025, 1.025)' }}
        _dark={{
          _hover: {
            bg: 'gray.700',
          },
        }}
        rounded="md"
        transitionDuration="slow"
        transitionProperty="all"
        transitionTimingFunction="ease-out"
      >
        <VStack alignItems="flex-start">
          <Heading size="md">
            <LinkOverlay as={Link} href={`/posts/${post.id}`}>
              {post.title}
            </LinkOverlay>
          </Heading>
          <HStack
            divider={
              <Text mx={2} color="gray.500">
                •
              </Text>
            }
          >
            <Text color="gray.500" fontSize="sm">
              <FormattedDate>{post.createdAt}</FormattedDate>
            </Text>
          </HStack>
        </VStack>
        <Text color="gray.500" fontSize="sm">
          {post.intro}
        </Text>
        <Text color="gray.500" fontSize="sm">
          Author: {post.authorFullName}
        </Text>
        <Box p={{ base: 0, full: 4 }} w="full">
          {post.isAuthor && (
            <ButtonGroup>
              <Button as={Link} href={`/posts/${post.id}/update`} size="sm">
                Edit post
              </Button>
              <Button size="sm" color="red.500" onClick={handleDeletePost}>
                Delete post
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </VStack>
    </LinkBox>
  );
};
export default PostCard;
