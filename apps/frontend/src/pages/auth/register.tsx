import { ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import Page from '@frontend/components/Page';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import SubmitButton from '@common/components/form/SubmitButton';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import toErrorMap from '@frontend/utils/toErrorMap';
import { loginSchema, registerInput } from '@frontend/validation/auth';
import { useRegisterMutation } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { UseFormSetError } from 'react-hook-form';

const RegisterPage: NextPage = () => {
  const defaultValues: registerInput = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
  };

  const [, register] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (
    data: registerInput,
    setError: UseFormSetError<registerInput>,
  ) => {
    const res = await register({
      options: {
        ...data,
      },
    });

    const errors = toErrorMap(setError, res.data?.register?.errors);

    if (!errors) {
      router.push('/');
    }
  };

  return (
    <Page>
      <FormProvider
        enableReinitialize
        initialValues={{
          ...defaultValues,
        }}
        validationSchema={loginSchema}
      >
        {methods => (
          <RHFForm<registerInput>
            onSubmit={async values => {
              await onSubmit(values, methods.setError);
            }}
            id="register-form"
          >
            <Heading marginY={5}>Register</Heading>
            <Stack
              padding={0}
              width="100%"
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Input
                name="firstName"
                id="firstName"
                label="First Name"
                placeholder="firstName"
                type="firstName"
              />
              <Input
                name="lastName"
                id="lastName"
                label="Last Name"
                placeholder="lastName"
                type="lastName"
              />
            </Stack>
            <Stack
              padding={0}
              width="100%"
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Input
                name="username"
                id="username"
                label="Username"
                placeholder="username"
                type="username"
              />
            </Stack>
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
export default withUrqlClient(createUrqlClient, { ssr: true })(RegisterPage);
