import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import Page from '@frontend/components/Page';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import { useLoginMutation } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useForm } from 'react-hook-form';

const LoginPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [, login] = useLoginMutation();

  const onSubmit = async () => {
    try {
      // await login()
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Page>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Button type="submit" isLoading={isSubmitting}>
            Login
          </Button>
        </FormControl>
      </form>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(LoginPage);
