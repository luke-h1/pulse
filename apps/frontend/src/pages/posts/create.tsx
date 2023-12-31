import {
  Button,
  Flex,
  Heading,
  InputGroup,
  Stack,
  Image as ChakraImage,
  Select,
  Text,
} from '@chakra-ui/react';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import Page from '@common/components/Page';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import toErrorMap from '@common/utils/toErrorMap';
import { postCreateInput, postCreateSchema } from '@frontend/validation/post';
import {
  useCreatePostMutation,
  useCreateSignatureMutation,
} from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { SyntheticEvent, useCallback, useState } from 'react';
import { Controller, UseFormSetError } from 'react-hook-form';
import TextArea from '@common/components/form/TextArea';
import dynamic from 'next/dynamic';
import uploadImage from '@frontend/utils/cloudinary';
import { useIsAuth } from '@frontend/hooks/useIsAuth';
import ChakraTagInput from '@frontend/components/ChakraTagInput';

const Editor = dynamic(() => import('@editor/index'), {
  ssr: false,
});

const CreatePostPage: NextPage = () => {
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  const [, createSignature] = useCreateSignatureMutation();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTagsChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (_event: SyntheticEvent<Element, Event>, tags: string[]) => {
      const hasDuplicatedTags = tags.some(
        (tag, index) => tags.indexOf(tag) !== index,
      );

      if (hasDuplicatedTags) {
        return;
      }

      setTags(tags);
    },
    [],
  );
  const onSubmit = async (
    data: postCreateInput,
    setError: UseFormSetError<postCreateInput>,
  ) => {
    const hasDuplicatedTags = tags.some(
      (tag, index) => tags.indexOf(tag) !== index,
    );

    if (hasDuplicatedTags) {
      // @ts-expect-error not defined in validation schema due to us
      // handling errors outside of react-hook-form
      // so react-hook-form doesn't know about it
      setError('tags', {
        type: 'manual',
        message: 'Tags must be unique',
      });
      return;
    }

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
        if (res.data.createPost.post.status === 'PUBLISHED') {
          router.push(`/posts/${res.data.createPost.post.id}`);
          return;
        }
        router.push(`/posts/${res.data.createPost.post.id}/preview`);
      }
    }
  };

  return (
    <Page
      site="frontend"
      seo={{
        title: 'Create post',
        description: 'Create a new post',
      }}
    >
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
            <Stack
              padding={0}
              width="100%"
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
              mb={5}
            >
              {' '}
              <Text mt={2} mb={2}>
                Tags
              </Text>
              <ChakraTagInput
                tags={tags}
                isRequired={tags.length === 0}
                onTagsChange={handleTagsChange}
                wrapProps={{ direction: 'column', align: 'start' }}
              />
            </Stack>
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
                  height={300}
                  mt={5}
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
                defaultValue={[]}
                render={({ field }) => (
                  <Editor
                    {...field}
                    holder="editorjs-container"
                    onChange={async value => {
                      methods.setValue('content', value);
                    }}
                  />
                )}
                name="content"
                control={methods.control}
              />
            </Stack>
            <Controller
              name="status"
              defaultValue="DRAFT"
              render={({ field }) => (
                <Select {...field}>
                  <option value="DRAFT">DRAFT</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                </Select>
              )}
            />
            <Button
              type="submit"
              disabled={
                methods.formState.isSubmitting || methods.formState.isLoading
              }
            >
              submit
            </Button>
          </RHFForm>
        )}
      </FormProvider>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(CreatePostPage);
