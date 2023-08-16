import EditorJS from '@editorjs/editorjs';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useMounted } from '@common/hooks/useMounted';
import { Flex, Kbd, Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import { InputControlProps } from '@common/components/form/Input';

interface Props {
  props: InputControlProps;
  editorRef: MutableRefObject<HTMLDivElement | null>;
}

export default function Editor({ props, editorRef }: Props) {
  const ref = useRef<EditorJS>();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const { isMounted } = useMounted();

  const { name, control } = props;

  const { field } = useController({
    name,
    control,
  });

  const initializeEditor = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        tools: {
          header: Header,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                // TODO: include upload image mutation here and return the url
                // will potentially need to include prop here or create new Image table
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '',
            },
          },
        },
      });
    }
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  // async function onSubmit(data: FormData) {
  //   const blocks = await ref.current?.save();

  //   const payload = {};

  //   // submit here
  // }

  if (!isMounted) {
    return null;
  }

  return (
    <Flex direction="column" w="full" p="4" rounded="lg" border="2px">
      <div
        id="editor"
        {...field}
        ref={editorRef}
        style={{
          minHeight: '500px',
        }}
        placeholder="Enter content..."
      />
      <Text size="sm" color="black.500">
        Use <Kbd>Tab</Kbd> to open the command menu.
      </Text>
    </Flex>
  );
}
