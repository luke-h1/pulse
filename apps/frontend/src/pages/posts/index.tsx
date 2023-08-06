import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { PostsQuery, usePostsQuery } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import {
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Icon,
  List,
  ListItem,
  HStack,
  Button,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import Page from '@frontend/components/Page';
import { HiOutlineSearch } from 'react-icons/hi';
import PostCard from '@frontend/components/PostCard';
import Tag from '@frontend/components/Tag';

const PostPage: NextPage = () => {
  const [{ data }] = usePostsQuery();
  const [selectedTag, setSelectedTag] = useState<string>();
  const [displayedPosts, setDisplayedPosts] = useState<PostsQuery | undefined>(
    data,
  );

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // TODO: implement full text search in BE
  };

  return (
    <Page>
      <VStack as="section" alignItems="flex-start" w="full" spacing={3}>
        <Heading size="md">Blog Posts.</Heading>
        <Text fontSize="md">
          All types of articles about software development, programming, and
          related topics.
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={HiOutlineSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            onChange={onSearch}
            placeholder="search blog posts"
            variant="filled"
          />
        </InputGroup>
      </VStack>
      {displayedPosts?.posts && displayedPosts.posts.length && (
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
          {displayedPosts.posts.map(post => {
            const tags = post.tags.map(tag => tag);
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
        {displayedPosts?.posts && displayedPosts?.posts.length > 0 ? (
          displayedPosts.posts.map(post => (
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
    </Page>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PostPage);
