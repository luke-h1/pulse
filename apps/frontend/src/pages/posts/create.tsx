import {
  Button,
  Flex,
  Heading,
  InputGroup,
  Stack,
  Image as ChakraImage,
} from '@chakra-ui/react';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import Page from '@frontend/components/Page';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import toErrorMap from '@frontend/utils/toErrorMap';
import { postCreateInput, postCreateSchema } from '@frontend/validation/post';
import {
  useCreatePostMutation,
  useCreateSignatureMutation,
} from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, UseFormSetError } from 'react-hook-form';
import TextArea from '@common/components/form/TextArea';
import dynamic from 'next/dynamic';
import uploadImage from '@frontend/utils/cloudinary';

const Editor = dynamic(() => import('@editor/index'), {
  ssr: false,
});

const CreatePostPage: NextPage = () => {
  const [, createPost] = useCreatePostMutation();
  const [, createSignature] = useCreateSignatureMutation();
  const router = useRouter();
  const [tags] = useState<string[]>(['test', 'test2']);
  const [previewImage, setPreviewImage] = useState<string>('');

  const onSubmit = async (
    data: postCreateInput,
    setError: UseFormSetError<postCreateInput>,
  ) => {
    const { data: signatureData } = await createSignature({});

    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;

      const imageData = await uploadImage(
        data.image as unknown as File,
        signature,
        timestamp,
      );

      const res = await createPost({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        options: {
          ...data,
          image: imageData?.secure_url,
          tags,
        },
      });

      const errors = toErrorMap(setError, res.data?.createPost?.errors);
      if (!errors && res.data?.createPost.post) {
        router.push(`/posts/${res.data.createPost.post.slug}`);
      }
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
            <TextArea name="intro" id="intro" placeholder="intro" size="sm" />
            <InputGroup>
              <input
                placeholder="image"
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={e => {
                  if (e.target.validity && e.target.files) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewImage(reader.result as string);
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      methods.setValue('image', e.target.files[0]);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </InputGroup>

            {previewImage && (
              <Flex width="100%" justifyContent="left" alignItems="stretch">
                <ChakraImage
                  src={previewImage}
                  alt="preview"
                  width={650}
                  height={400}
                  mb={10}
                />
              </Flex>
            )}
            <Stack
              padding={0}
              width="100%"
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Controller
                render={({ field }) => (
                  <Editor
                    {...field}
                    holder="editorjs-container"
                    onChange={value =>
                      methods.setValue('content', value.blocks)
                    }
                  />
                )}
                name="content"
                control={methods.control}
                defaultValue=""
                rules={{
                  validate: {},
                }}
              />
            </Stack>
            <Button type="submit">submit</Button>
          </RHFForm>
        )}
      </FormProvider>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(CreatePostPage);
