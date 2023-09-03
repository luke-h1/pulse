import { NextPage } from 'next';
import { VStack, Heading, HStack, Text, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { usePostQuery } from '@graphql-hooks/generated';
import FormattedDate from '@common/components/FormattedDate';
import ScrollToTop from '@frontend/components/ScrollToTop';

const PostSlugPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: id as string,
    },
  });

  return (
    !fetching && (
      <>
        <VStack position="relative" alignItems="stretch" w="full" spacing={8}>
          <VStack alignItems="flex-start" spacing={3}>
            <Heading as="h1" size="lg">
              {data?.post?.title}
            </Heading>
            <HStack
              divider={
                <Text mx={2} color="gray.500">
                  •
                </Text>
              }
            >
              <Text color="gray.500" fontSize="sm">
                <FormattedDate>{data?.post?.createdAt}</FormattedDate>
              </Text>
              {/* needs BE functionality */}
              {/* <HStack>
              {!views && <Spinner color='gray.500' size='xs' />}
              {views && (
                <Text color='gray.500' fontSize='sm'>
                  {views} views
                </Text>
              )}
            </HStack> */}
              <Text color="gray.500" fontSize="sm">
                {data?.post?.readingTime}
              </Text>
            </HStack>
          </VStack>
          {/* editorjs output here */}
          <Divider />
          {/* needs BE functionality */}
          {/* {!fetching && (
          <HStack alignItems="center" justifyContent="center">
            <LikeButton
              onLike={incrementLikes}
              likes={likes}
              userLikes={userLikes}
            />
          </HStack>
        )} */}
        </VStack>
        <ScrollToTop />
      </>
    )
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(PostSlugPage);
