import {
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import FormattedDate from '@common/components/FormattedDate';

interface Props {
  post: {
    __typename?: 'Post' | undefined;
    id: string;
    title: string;
    intro: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    slug: string;
    tags: string[];
    image?: string | null | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedAt: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any;
  };
}

const PostCard = ({ post }: Props) => {
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
            <LinkOverlay as={Link} href={`/posts/${post.slug}`}>
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
      </VStack>
    </LinkBox>
  );
};
export default PostCard;
