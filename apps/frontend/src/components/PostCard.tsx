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
import { ArrayElementType } from '@frontend/types/util';

interface Props {
  post: ArrayElementType<RecentPostsQuery['recentPosts']>;
  showControls?: boolean;
}

const PostCard = ({ post, showControls }: Props) => {
  const [, deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    // confirm before deleting
    console.log('delete post');
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
        <Box p={{ base: 0, full: 4 }} w="full">
          {showControls && (
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
