import { NextPage } from 'next';
import { VStack, Heading, HStack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import {
  Status,
  usePostQuery,
  usePostStatusQuery,
} from '@graphql-hooks/generated';
import FormattedDate from '@common/components/FormattedDate';
import ScrollToTop from '@frontend/components/ScrollToTop';
import { isServer, useMounted } from '@common/hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Page from '@frontend/components/Page';
import useMe from '@frontend/hooks/useMe';

const EditorOutput = dynamic(() => import('@editor/renderers/EditorOutput'), {
  ssr: false,
});

const PostSlugPage: NextPage = () => {
  const { isMounted } = useMounted();

  const router = useRouter();

  const [{ data }] = usePostQuery({
    variables: {
      id: router.query.id as string,
      status: Status.Published,
    },
    pause: isServer,
  });

  if (!isMounted) {
    return null;
  }

  if (data?.post?.status !== Status.Published) {
    return (
      <Page>
        <Text>Post is not published yet</Text>
      </Page>
    );
  }

  return (
    <Page>
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
        <EditorOutput content={data?.post?.content} />
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
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(PostSlugPage);
