import {
  Flex,
  Heading,
  InputGroup,
  Stack,
  Text,
  Image as ChakraImage,
  Select,
  Button,
} from '@chakra-ui/react';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import TextArea from '@common/components/form/TextArea';
import useMounted from '@common/hooks/useMounted';
import ChakraTagInput from '@frontend/components/ChakraTagInput';
import Page from '@common/components/Page';
import { useIsAuth } from '@frontend/hooks/useIsAuth';
import useIsProjectAuthor from '@frontend/hooks/useIsProjectAuthor';
import uploadImage from '@frontend/utils/cloudinary';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import toErrorMap from '@frontend/utils/toErrorMap';
import {
  projectUpdateInput,
  projectUpdateSchema,
} from '@frontend/validation/project';
import {
  useCreateSignatureMutation,
  useProjectQuery,
  useUpdateProjectMutation,
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

const UpdateProjectPage: NextPage = () => {
  const { isMounted } = useMounted();
  const [, updateProject] = useUpdateProjectMutation();
  const router = useRouter();
  useIsAuth();

  const [{ data, fetching }] = useProjectQuery({
    variables: {
      id: router.query.id as string,
    },
  });

  useIsProjectAuthor(fetching, data?.project);

  const [previewImage, setPreviewImage] = useState<string>(
    data?.project?.image as string,
  );
  const [tags, setTags] = useState<string[]>(data?.project?.tags ?? []);
  const [, createSignature] = useCreateSignatureMutation();

  const handleTagsChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (_event: SyntheticEvent, tags: string[]) => {
      setTags(tags);
    },
    [],
  );

  const onSubmit = async (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    data: projectUpdateInput,
    setError: UseFormSetError<projectUpdateInput>,
  ) => {
    const hasDuplicatedTags = tags.some(
      (tag, index) => tags.indexOf(tag) !== index,
    );

    if (hasDuplicatedTags) {
      // @ts-expect-error not defined in types
      setError('tags', {
        type: 'manual',
        message: 'Tags must be unique',
      });
      // eslint-disable-next-line no-useless-return
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

      const res = await updateProject({
        id: router.query.id as string,
        // @ts-expect-error content not defined in types
        options: {
          ...data,
          image: imageData?.secure_url,
          tags,
        },
      });
      const errors = toErrorMap(setError, res.data?.updateProject?.errors);

      if (!errors) {
        switch (data.status) {
          case 'DRAFT':
            router.push(`/projects/${router.query.id}/preview`);
            break;
          case 'PUBLISHED':
            router.push(`/projects/${router.query.id}`);
            break;
          case 'SCHEDULED':
            router.push(`/projects/${router.query.id}/preview`);
            break;
          default:
            router.push('/projects');
            break;
        }
      }
    }
  };
  if (!isMounted) {
    return null;
  }

  return (
    <Page
      site="frontend"
      seo={{
        title: `Update Project ${data?.project?.title}`,
        description: 'Update your project',
      }}
    >
      <FormProvider
        enableReinitialize
        validationSchema={projectUpdateSchema}
        initialValues={{
          title: data?.project?.title,
          intro: data?.project?.intro,
          image: data?.project?.image,
          content: data?.project?.content,
          appStoreUrl: data?.project?.appStoreUrl,
          githubUrl: data?.project?.githubUrl,
          playStoreUrl: data?.project?.playStoreUrl,
          siteUrl: data?.project?.siteUrl,
          status: data?.project?.status,
          tags,
        }}
      >
        {methods => (
          <RHFForm<projectUpdateInput>
            id="project-update"
            onSubmit={async values => {
              await onSubmit(values, methods.setError);
            }}
            width="80%"
          >
            <Heading marginY={5}>Create Project</Heading>
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
            <Stack padding={0} width="100%" spacing={5}>
              <Input
                name="appStoreUrl"
                id="appStoreUrl"
                label="App Store URL"
                placeholder="App Store URL of project"
              />
              <Input
                name="playStoreUrl"
                id="playStoreUrl"
                label="Play Store URL"
                placeholder="Play Store URL of project"
              />
              <Input
                name="siteUrl"
                id="siteUrl"
                label="Website URL"
                placeholder="Website URL of project"
              />
              <Input
                name="githubUrl"
                id="githubUrl"
                label="GitHub URL"
                placeholder="GitHub URL of project"
              />
            </Stack>
            <Controller
              name="status"
              defaultValue={data?.project?.status}
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
export default withUrqlClient(createUrqlClient, {
  ssr: true,
})(UpdateProjectPage);
