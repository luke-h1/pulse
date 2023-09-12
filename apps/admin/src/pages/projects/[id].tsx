import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import Page from '@common/components/Page';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import {
  Status,
  useDeleteProjectAdminMutation,
  useProjectQuery,
  useUpdateUserStatusMutation,
  AccountStatus,
} from '@graphql-hooks/generated';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import ProjectPage from '@common/components/ProjectPage';

const ManageProject = () => {
  const router = useRouter();
  const { id } = router.query;

  const [{ data }] = useProjectQuery({
    variables: {
      id: id as string,
    },
  });

  const [, deleteProjectAdmin] = useDeleteProjectAdminMutation();
  const [, updateUserStatus] = useUpdateUserStatusMutation();

  return (
    <Page
      site="admin"
      seo={{
        title: 'Manage Project',
        description: 'Manage Project',
      }}
    >
      <h1>Manage projects</h1>
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle>
          This project is in status {data?.project?.status}
        </AlertTitle>
        <Button>
          {data?.project?.status === Status.Draft ? 'Publish' : 'Unpublish'}
        </Button>
        <Button
          onClick={() =>
            deleteProjectAdmin({
              deleteProjectAdminId: id as string,
            })
          }
        >
          Delete Project
        </Button>
        <Button
          onClick={() =>
            updateUserStatus({
              status: AccountStatus.Banned,
              updateUserStatusId: data?.project?.creator.id as string,
            })
          }
        >
          Ban Project Creator
        </Button>
      </Alert>
      <ProjectPage project={data?.project} />
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(ManageProject);
