import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import isServer from '@common/hooks/isServer';
import useMounted from '@common/hooks/useMounted';
import Page from '@common/components/Page';
import ProjectPage from '@frontend/components/ProjectPage';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import { useMeQuery, useProjectQuery } from '@graphql-hooks/generated';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

const ProjectPreviewPage = () => {
  const router = useRouter();
  const { isMounted } = useMounted();
  const [{ data: meData }] = useMeQuery({
    pause: isServer,
  });

  const [{ data }] = useProjectQuery({
    variables: {
      id: router.query.id as string,
    },
    pause: isServer,
  });

  if (meData?.me?.id !== data?.project?.creator.id) {
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
        title: data?.project?.title,
        description: data?.project?.intro,
        openGraph: {
          title: data?.project?.title,
          description: data?.project?.intro,
          images: [
            {
              url: data?.project?.image as string,
              width: 800,
              height: 600,
              alt: data?.project?.title,
            },
          ],
        },
      }}
    >
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle>
          This project is in status {data?.project?.status}
        </AlertTitle>
        <AlertDescription>It is not published yet</AlertDescription>
      </Alert>
      <ProjectPage project={data?.project} />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(
  ProjectPreviewPage,
);
