import { createUrqlClient } from '@common/urql/createUrqlClient';
import {
  PostsQuery,
  SearchPostsDocument,
  SearchPostsQuery,
  SearchPostsQueryVariables,
  Status,
  usePostsQuery,
} from '@graphql-hooks/generated';
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
import Page from '@common/components/Page';
import { HiOutlineSearch } from 'react-icons/hi';
import PostCard from '@common/components/PostCard';
import Tag from '@frontend/components/Tag';
import useDebouncedCallback from '@common/hooks/useDebouncedCallback';
import searchClient from '@frontend/utils/searchClient';

const PostPage: NextPage = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      status: Status.Published,
    },
  });
  const [selectedTag, setSelectedTag] = useState<string>();
  const [displayedPosts, setDisplayedPosts] = useState<PostsQuery | undefined>(
    data,
  );

  const [onSearch] = useDebouncedCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 0) {
        const result = await searchClient.request<
          SearchPostsQuery,
          SearchPostsQueryVariables
        >(SearchPostsDocument, {
          query: e.target.value,
        });

        setDisplayedPosts(result?.searchPosts as PostsQuery);
      }
    },
    800,
  );

  return (
    <Page
      site="frontend"
      seo={{
        title: 'Posts',
        description:
          'All types of articles about software development, programming, and related topics.',
      }}
    >
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
      {displayedPosts?.posts && displayedPosts.posts.length > 0 && (
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
            const { tags } = post;

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
