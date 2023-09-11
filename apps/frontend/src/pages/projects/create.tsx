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
import ChakraTagInput from '@frontend/components/ChakraTagInput';
import Page from '@common/components/Page';
import { useIsAuth } from '@frontend/hooks/useIsAuth';
import uploadImage from '@frontend/utils/cloudinary';
import { createUrqlClient } from '@common/urql/createUrqlClient';
import toErrorMap from '@frontend/utils/toErrorMap';
import {
  projectCreateInput,
  projectCreateSchema,
} from '@frontend/validation/project';
import {
  ProjectCreateInput,
  Status,
  useCreateProjectMutation,
  useCreateSignatureMutation,
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

const CreateProjectPage: NextPage = () => {
  useIsAuth();
  const [, createProject] = useCreateProjectMutation();
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
    data: ProjectCreateInput,
    setError: UseFormSetError<ProjectCreateInput>,
  ) => {
    const hasDuplicatedTags = tags.some(
      (tag, index) => tags.indexOf(tag) !== index,
    );

    if (hasDuplicatedTags) {
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

      const res = await createProject({
        options: {
          ...data,
          image: imageData?.secure_url,
          tags,
        },
      });

      const errors = toErrorMap(setError, res.data?.createProject?.errors);

      if (!errors && res.data?.createProject.project?.id) {
        switch (res.data.createProject.project?.status) {
          case Status.Draft:
            router.push(
              `/projects/${res.data.createProject.project?.id}/preview`,
            );
            break;
          case Status.Scheduled:
            router.push(
              `/projects/${res.data.createProject.project?.id}/preview`,
            );
            break;
          case Status.Published:
            router.push(`/projects/${res.data.createProject.project?.id}`);
            break;

          default:
            router.push(`/projects/${res.data.createProject.project?.id}`);
            break;
        }
      }
    }
  };

  return (
    <Page
      site="frontend"
      seo={{
        title: 'Create Project',
        description: 'Create a new project',
      }}
    >
      <FormProvider enableReinitialize validationSchema={projectCreateSchema}>
        {methods => (
          <RHFForm<projectCreateInput>
            id="project-create"
            onSubmit={async values => {
              // @ts-expect-error not defined in validation schema due to us
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
export default withUrqlClient(createUrqlClient, { ssr: true })(
  CreateProjectPage,
);
