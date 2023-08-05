import { Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { Post, PostsQuery } from '@graphql-hooks/generated';
import PostCard from './PostCard';

interface Props {
  posts?: PostsQuery['posts'];
}

const PostsSection = ({ posts }: Props) => {
  return (
    <VStack as="section" alignItems="flex-start" w="full" spacing={4}>
      <Heading size="md">Recent Posts</Heading>
      <List w="full" spacing={{ base: 8, md: 2 }}>
        {posts && posts.results.length > 0 ? (
          posts.results.map(post => (
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
