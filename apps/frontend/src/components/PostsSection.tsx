import { Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { RecentPostsQuery } from '@graphql-hooks/generated';
import PostCard from './PostCard';

interface Props {
  posts?: RecentPostsQuery['recentPosts'];
}

const PostsSection = ({ posts }: Props) => {
  return (
    <VStack as="section" alignItems="flex-start" w="full" spacing={4}>
      <Heading size="md">Recent Posts</Heading>
      <List w="full" spacing={{ base: 8, md: 2 }}>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <ListItem key={post.id}>
              <PostCard post={post} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Text>No posts available</Text>
          </ListItem>
        )}
      </List>
    </VStack>
  );
};
export default PostsSection;
