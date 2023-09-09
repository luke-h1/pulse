import { NextPage } from 'next';
import { Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { Status, usePostQuery } from '@graphql-hooks/generated';
import { isServer, useMounted } from '@common/hooks';
import { useRouter } from 'next/router';
import Page from '@frontend/components/Page';
import PostPage from '@frontend/components/PostPage';

const PostSlugPage: NextPage = () => {
  const { isMounted } = useMounted();

  const router = useRouter();

  const [{ data }] = usePostQuery({
    variables: {
      id: router.query.id as string,
    },
    pause: isServer,
  });

  if (!isMounted) {
    return null;
  }

  if (data?.post?.status !== Status.Published) {
    return (
      <Page
        seo={{
          title: 'Post not published',
          description: 'Post is not published yet',
        }}
      >
        <Text>Post is not published yet</Text>
      </Page>
    );
  }

  if (!data.post) {
    router.push('/404');
  }

  return (
    <Page
      seo={{
        title: data?.post?.title,
        description: data?.post?.intro,
        openGraph: {
          title: data?.post?.title,
          description: data?.post?.intro,
          images: [
            {
              url: data?.post?.image as string,
              width: 800,
              height: 600,
              alt: data?.post?.title,
            },
          ],
        },
      }}
    >
      <PostPage post={data.post} />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(PostSlugPage);
