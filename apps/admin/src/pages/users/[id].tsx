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
import { useUserQuery } from '@graphql-hooks/generated';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching }] = useUserQuery({
    variables: {
      userId: id as string,
    },
  });

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
      <Heading>User '{data?.user?.username}'</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Manage user {data?.user?.id}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>username</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{data?.user?.id}</Td>
              <Td>{data?.user?.email}</Td>
              <Td>{data?.user?.username}</Td>
              <Td>
                <ButtonGroup>
                  <Button>Ban user</Button>
                  <Button>Put user on hold</Button>
                  <Button>Delete user</Button>
                </ButtonGroup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(UserPage);
