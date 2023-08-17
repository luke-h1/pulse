import {
  Button,
  Container,
  Flex,
  Heading,
  InputGroup,
  Stack,
  Text,
  Image as ChakraImage,
} from '@chakra-ui/react';
import FormProvider from '@common/components/form/FormProvider';
import Input from '@common/components/form/Input';
import RHFForm from '@common/components/form/RHFForm';
import Editor from '@editor/index';
import Page from '@frontend/components/Page';
import ChakraTagInput from '@frontend/components/form/Tag';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';
import toErrorMap from '@frontend/utils/toErrorMap';
import { postCreateInput, postCreateSchema } from '@frontend/validation/post';
import { useCreatePostMutation } from '@graphql-hooks/generated';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import TextArea from '@common/components/form/TextArea';

const CreatePostPage: NextPage = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleTagsChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (event: SyntheticEvent, tags: string[]) => {
      setTags(tags);
    },
    [],
  );

  const handleTagRemove = useCallback(
    (event: SyntheticEvent, index: number) => {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    },

    [tags],
  );

  const handleTagAdd = useCallback(
    (event: SyntheticEvent, tag: string) => {
      // non mutative
      const newTags = [...tags, tag];
      setTags(newTags);

      tagInputRef.current?.focus();
    },
    [tags],
  );

  const onSubmit = async (
    data: postCreateInput,
    setError: UseFormSetError<postCreateInput>,
  ) => {
    // const blocks = ref?.current?.save(); // TODO: need ref to be of type EditorJS
    console.log('data is ', data);
    const res = await createPost({
      options: {
        ...data,
        tags,
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
            <TextArea name="intro" id="intro" placeholder="intro" size="sm" />
            <InputGroup>
              <input
                placeholder="image"
                type="file"
                name="image"
                id="image"
                onChange={e => {
                  if (e.target.validity && e.target.files) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewImage(reader.result as string);
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
              <Editor
                props={{
                  name: 'content',
                  id: 'content',
                  label: 'content',
                }}
                name="content"
                editorRef={ref}
              />
            </Stack>
            <Container py={8}>
              {/* need to sort tags being set as one big string */}
              <Text>Post tags</Text>
              <ChakraTagInput
                tags={tags}
                id="tags"
                name="tags"
                label="Tags"
                placeholder="Add some tags"
                onTagsChange={handleTagsChange}
                onTagRemove={handleTagRemove}
                onTagAdd={handleTagAdd}
                ref={tagInputRef}
              />
            </Container>
            <Button type="submit">submit</Button>
          </RHFForm>
        )}
      </FormProvider>
    </Page>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(CreatePostPage);
