import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import isServer from '@common/hooks/isServer';
import useMounted from '@common/hooks/useMounted';

import Page from '@common/components/Page';
import PostPage from '@frontend/components/PostPage';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { useMeQuery, usePostQuery } from '@graphql-hooks/generated';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

const PreviewPage = () => {
  const router = useRouter();
  const { isMounted } = useMounted();
  const [{ data: meData }] = useMeQuery({
    pause: isServer,
  });

  const [{ data }] = usePostQuery({
    variables: {
      id: router.query.id as string,
    },
    pause: isServer,
  });

  if (meData?.me?.id !== data?.post?.creator.id) {
    return (
      <Page
        site="frontend"
        seo={{
          title: 'Unauthorized',
        }}
      >
        <h1>Unauthorized</h1>
      </Page>
    );
  }

  if (!isMounted) {
    return null;
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
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle>This post is in status {data?.post?.status}</AlertTitle>
        <AlertDescription>It is not published yet</AlertDescription>
      </Alert>
      <PostPage post={data?.post} />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(PreviewPage);
