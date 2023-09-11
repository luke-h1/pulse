import { NextPage } from 'next';
import { Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import { Status, usePostQuery } from '@graphql-hooks/generated';
import { useRouter } from 'next/router';
import Page from '@common/components/Page';
import PostPage from '@frontend/components/PostPage';
import isServer from '@common/hooks/isServer';
import useMounted from '@common/hooks/useMounted';

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
        site="frontend"
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
      site="frontend"
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
