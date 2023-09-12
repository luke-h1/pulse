import {
  Button,
  ButtonGroup,
  Heading,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Page from '@common/components/Page';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import {
  AccountStatus,
  useDeleteUserMutation,
  useMeQuery,
  useUpdateUserStatusMutation,
  useUsersQuery,
} from '@graphql-hooks/generated';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';

const UsersPage = () => {
  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = useUsersQuery();
  const [, updateUserStatus] = useUpdateUserStatusMutation();
  const [, deleteUser] = useDeleteUserMutation();

  if (fetching) {
    return <Spinner />;
  }

  return (
    <Page
      site="admin"
      seo={{
        title: 'User',
        description: 'User page',
      }}
    >
      <Heading>Users</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Manage users</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>username</Th>
              <Th>Account Status</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.users &&
              data.users
                .filter(u => u.id !== meData?.me?.id)
                .map(user => (
                  <Tr key={user.id}>
                    <Td>
                      <Link href={`/users/${user.id}`}>{user?.id} </Link>
                    </Td>
                    <Td>{user?.email}</Td>
                    <Td>{user?.username}</Td>
                    <Td>{user?.accountStatus}</Td>
                    <Td>{user?.role}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          onClick={() => {
                            updateUserStatus({
                              updateUserStatusId: user.id,
                              status: AccountStatus.Banned,
                            });
                          }}
                        >
                          Ban user
                        </Button>
                        <Button
                          onClick={() => {
                            updateUserStatus({
                              updateUserStatusId: user.id,
                              status: AccountStatus.OnHold,
                            });
                          }}
                        >
                          Put user on hold
                        </Button>
                        <Button
                          onClick={() => {
                            updateUserStatus({
                              updateUserStatusId: user.id,
                              status: AccountStatus.Active,
                            });
                          }}
                        >
                          un-ban user
                        </Button>
                        <Button
                          onClick={() =>
                            deleteUser({
                              deleteUserId: user.id,
                            })
                          }
                        >
                          Delete user
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(UsersPage);
