import { ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import Page from '@common/components/Page';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import SubmitButton from '@common/components/form/SubmitButton';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import toErrorMap from '@common/utils/toErrorMap';
import { loginInput, loginSchema } from '@common/validation/auth';
import { useAdminLoginMutation } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { UseFormSetError } from 'react-hook-form';

const LoginPage: NextPage = () => {
  const defaultValues: loginInput = {
    email: '',
    password: '',
  };

  const [, adminLogin] = useAdminLoginMutation();
  const router = useRouter();

  const onSubmit = async (
    data: loginInput,
    setError: UseFormSetError<loginInput>,
  ) => {
    const { email, password } = data;

    const res = await adminLogin({
      options: {
        email,
        password,
      },
    });

    const errors = toErrorMap(setError, res.data?.adminLogin?.errors);

    if (!errors) {
      router.push('/');
    }
  };

  return (
    <Page
      site="frontend"
      seo={{
        title: 'Admin Login',
        description: 'Login to your admin Pulse account',
      }}
    >
      <FormProvider
        enableReinitialize
        initialValues={{
          ...defaultValues,
        }}
        validationSchema={loginSchema}
      >
        {methods => (
          <RHFForm<loginInput>
            onSubmit={async values => {
              await onSubmit(values, methods.setError);
            }}
            id="login-form"
          >
            <Heading marginY={5}>Login</Heading>
            <Stack
              padding={0}
              width="100%"
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Input
                name="email"
                id="email"
                label="Email"
                placeholder="email"
                type="email"
              />
              <Input
                name="password"
                id="password"
                label="Password"
                placeholder="password"
                type="password"
              />
            </Stack>
            <ButtonGroup>
              <SubmitButton>Submit</SubmitButton>
            </ButtonGroup>
          </RHFForm>
        )}
      </FormProvider>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(LoginPage);
