import { Heading } from '@chakra-ui/react';
import Page from '@common/components/Page';
import { NextPage } from 'next';

const DeletedAccountPage: NextPage = () => {
  return (
    <Page
      site="frontend"
      seo={{
        title: 'Deleted Account',
      }}
    >
      <Heading>Your account has been deleted.</Heading>
    </Page>
  );
};
export default DeletedAccountPage;
