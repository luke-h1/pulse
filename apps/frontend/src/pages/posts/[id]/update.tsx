import {
  Flex,
  Heading,
  InputGroup,
  Stack,
  Text,
  Image as ChakraImage,
  Button,
  Select,
} from '@chakra-ui/react';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import TextArea from '@common/components/form/TextArea';
import ChakraTagInput from '@frontend/components/ChakraTagInput';
import Page from '@frontend/components/Page';
import { useIsAuth } from '@frontend/hooks/useIsAuth';
import uploadImage from '@frontend/utils/cloudinary';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import toErrorMap from '@frontend/utils/toErrorMap';
import { postUpdateInput, postUpdateSchema } from '@frontend/validation/post';
import {
  useCreateSignatureMutation,
  useMeQuery,
  usePostQuery,
  useUpdatePostMutation,
} from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SyntheticEvent, useCallback, useState } from 'react';
import { Controller, UseFormSetError } from 'react-hook-form';

const Editor = dynamic(() => import('@editor/index'), {
  ssr: false,
});

const UpdatePostPage: NextPage = () => {
  useIsAuth();
  const [{ data: meData }] = useMeQuery();
  const [, updatePost] = useUpdatePostMutation();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [, createSignature] = useCreateSignatureMutation();

  const id = router.query.id as string;

  const [{ data }] = usePostQuery({
    variables: {
      id,
    },
  });
  const [tags, setTags] = useState<string[]>(data?.post?.tags ?? []);

  if (!data?.post) {
    router.push('/404');
  }

  if (data?.post?.creator.id !== meData?.me?.id) {
    router.push('/404');
  }

  const handleTagsChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (_event: SyntheticEvent, tags: string[]) => {
      setTags(tags);
    },
    [],
  );

  const onSubmit = async (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    data: postUpdateInput,
    setError: UseFormSetError<postUpdateInput>,
  ) => {
    const { data: signatureData } = await createSignature({});

    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;

      const imageData = await uploadImage(
        data.image as unknown as File,
        signature,
        timestamp,
      );
      const res = await updatePost({
        id,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        options: {
          ...data,
          image: imageData?.secure_url,
          tags,
        },
      });

      const errors = toErrorMap(setError, res.data?.updatePost?.errors);
      if (!errors && res.data?.updatePost.post) {
        router.push(`/posts/${res.data.updatePost.post.id}/preview`);
      }
    }
  };

  return (
    <Page
      seo={{
        title: `Update post ${data?.post?.title}`,
        description: 'Update your post',
      }}
    >
      <FormProvider
        enableReinitialize
        validationSchema={postUpdateSchema}
        initialValues={{
          title: data?.post?.title,
          intro: data?.post?.intro,
          content: data?.post?.content,
          image: data?.post?.image,
          status: data?.post?.status,
          tags,
        }}
      >
        {methods => (
          <RHFForm<postUpdateInput>
            id="post-create"
            onSubmit={async values => {
              await onSubmit(values, methods.setError);
            }}
            width="80%"
          >
            <Heading marginY={5}>Update post '{data?.post?.title}'</Heading>
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
                onTagsChange={handleTagsChange}
                isRequired
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
                render={({ field }) => (
                  <Editor
                    {...field}
                    data={data?.post?.content}
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
            <Button type="submit">submit</Button>
          </RHFForm>
        )}
      </FormProvider>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, {
  ssr: true,
})(UpdatePostPage);
