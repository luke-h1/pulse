import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import Page from '@common/components/Page';
import { useIsAuth } from '@frontend/hooks/useIsAuth';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import {
  useDeleteAccountMutation,
  useMeQuery,
  useMyPostsQuery,
  useMyProjectsQuery,
} from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

const MeUserPage: NextPage = () => {
  const router = useRouter();
  useIsAuth();
  const [{ data }] = useMeQuery();
  const [{ data: projectsData }] = useMyProjectsQuery();
  const [{ data: postsData }] = useMyPostsQuery();
  const [, deleteAccount] = useDeleteAccountMutation();

  if (!data) {
    return null;
  }

  const onDeleteAccount = () => {
    // eslint-disable-next-line no-alert
    alert('Are you sure you want to delete your account?');
    deleteAccount({});
    router.push('/user/deleted-account');
  };

  return (
    <Page
      seo={{
        title: 'Me',
      }}
      site="frontend"
    >
      <Container mt={4}>
        <Center>
          <VStack>
            <Heading>
              {data.me?.firstName} {data.me?.lastName}
            </Heading>
            <Text color="gray">{data.me?.username}</Text>
            {data.me?.bio && <Text>{data.me?.bio}</Text>}
            <HStack>
              <Text>Posts created: {postsData?.myPosts?.length}</Text>
              <Text>Projects created: {projectsData?.myProjects?.length}</Text>
            </HStack>
            <HStack>
              <Button onClick={onDeleteAccount}>Delete account</Button>
            </HStack>
          </VStack>
        </Center>
      </Container>
    </Page>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MeUserPage);
