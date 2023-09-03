import { VStack, Heading, HStack, Divider, Text } from '@chakra-ui/react';
import FormattedDate from '@common/components/FormattedDate';
import ScrollToTop from '@frontend/components/ScrollToTop';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { useProjectQuery } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProjectSlugPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching }] = useProjectQuery({
    variables: {
      id: id as string,
    },
  });

  useEffect(() => {
    if (!data?.project) {
      router.push('/404');
    }
  }, [router, data]);

  return (
    !fetching && (
      <>
        <VStack position="relative" alignItems="stretch" w="full" spacing={8}>
          <VStack alignItems="flex-start" spacing={3}>
            <Heading as="h1" size="lg">
              {data?.project?.title}
            </Heading>
            <HStack
              divider={
                <Text mx={2} color="gray.500">
                  •
                </Text>
              }
            >
              <Text color="gray.500" fontSize="sm">
                <FormattedDate>{data?.project?.createdAt}</FormattedDate>
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
                {/* needs be work */}
                {/* {data?.project?.readingTime} */}
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
export default withUrqlClient(createUrqlClient, { ssr: true })(ProjectSlugPage);
