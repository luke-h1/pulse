import { Heading, Stack, Textarea } from '@chakra-ui/react';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import Editor from '@editor/index';
import Page from '@frontend/components/Page';
import ImageInput from '@frontend/components/form/ImageInput';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import toErrorMap from '@frontend/utils/toErrorMap';
import { postCreateInput, postCreateSchema } from '@frontend/validation/post';
import { useCreatePostMutation } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { UseFormSetError } from 'react-hook-form';

const CreatePostPage: NextPage = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  const onSubmit = async (
    data: postCreateInput,
    setError: UseFormSetError<postCreateInput>,
  ) => {
    const res = await createPost({
      options: {
        ...data,
        image: '',
      },
    });

    const errors = toErrorMap(setError, res.data?.createPost?.errors);

    if (!errors) {
      router.push('/');
    }
  };

  return (
    <Page>
      <FormProvider enableReinitialize validationSchema={postCreateSchema}>
        {methods => (
          <RHFForm<postCreateInput>
            id="post-create"
            onSubmit={async values => {
              await onSubmit(values, methods.setError);
            }}
            width="80%"
          >
            <Heading marginY={5}>Create post</Heading>
            <Stack
              padding={0}
              width="100%"
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Input
                name="title"
                id="title"
                label="Title"
                placeholder="Title"
              />
            </Stack>
            <Textarea name="intro" id="intro" placeholder="intro" size="sm" />
            <ImageInput name="image" id="image" />

            <Stack
              padding={0}
              width="100%"
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Editor
                props={{
                  name: 'content',
                  id: 'content',
                  label: 'Content',
                }}
                editorRef={ref}
              />
            </Stack>
          </RHFForm>
        )}
      </FormProvider>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(CreatePostPage);
