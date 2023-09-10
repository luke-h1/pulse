import {
  VStack,
  Heading,
  HStack,
  Divider,
  Text,
  Spinner,
} from '@chakra-ui/react';
import FormattedDate from '@common/components/FormattedDate';
import { ScrollToTop } from '@ui/components';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { Status, useProjectQuery } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Page from '@common/components/Page';
import useMounted from '@common/hooks/useMounted';
import EditorOutput from '@editor/renderers/EditorOutput';
import isServer from '@common/hooks/isServer';
import ProjectPage from '@frontend/components/ProjectPage';

const ProjectSlugPage: NextPage = () => {
  const { isMounted } = useMounted();
  const router = useRouter();

  const [{ data, fetching }] = useProjectQuery({
    variables: {
      id: router.query.id as string,
    },
    pause: isServer,
  });

  if (!isMounted) {
    return null;
  }

  if (fetching) {
    return <Spinner />;
  }

  if (data?.project?.status !== Status.Published) {
    return (
      <Page
        site="frontend"
        seo={{
          title: 'Project not published',
          description: 'Project is not published yet',
        }}
      >
        <Text>Project is not published yet</Text>
      </Page>
    );
  }

  if (!fetching && !data.project) {
    router.push('/404');
  }

  return (
    <Page
      site="frontend"
      seo={{
        title: data?.project?.title,
        description: data?.project?.intro,
      }}
    >
      <ProjectPage project={data?.project} />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(ProjectSlugPage);
