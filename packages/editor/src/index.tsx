import { useCallback, useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import useMounted from '@common/hooks/useMounted';
import { Flex } from '@chakra-ui/react';

interface Props {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
  // uploadImage: (file: File) => Promise<
  //   | {
  //       success: number;
  //       file: {
  //         url: string;
  //       };
  //     }
  //   | undefined
  // >;
}

export default function Editor({ holder, onChange, data }: Props) {
  const ref = useRef<EditorJS>();
  const { isMounted } = useMounted();

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
        holder,
        placeholder: 'Type here to write your post',
        inlineToolbar: true,
        autofocus: false,
        data: { blocks: data?.blocks ?? [] },
        onReady() {
          // eslint-disable-next-line no-param-reassign
          ref.current = editor;
        },
        tools: {
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `/api/link`,
            },
          },
          image: {
            class: ImageTool,
            config: {},
          },
          header: Header,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
        async onChange(api) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const data = await api.saver.save();
          onChange(data);
        },
        hideToolbar: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        // eslint-disable-next-line no-param-reassign
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return null;
  }

  return (
    <Flex direction="column" w="full" p="4" rounded="lg" border="2px">
      <div id={holder} className="prose max-w-full" />
    </Flex>
  );
}
