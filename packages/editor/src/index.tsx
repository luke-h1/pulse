import EditorJS from '@editorjs/editorjs';
import { useCallback, useEffect, useRef } from 'react';
import useMountedRef from '@common/hooks/useMountedRef';

export default function Editor() {
  const ref = useRef<EditorJS>();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const isMounted = useMountedRef();

  const initializeEditor = useCallback(async () => {
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
        tools: {
          header: Header,
          image: {
            config: {
              uploader: {
                // TODO: include upload image mutation here and return the url
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    const initEditor = async () => {
      await initializeEditor();

      setTimeout(() => {
        titleRef.current?.focus();
      }, 0);
    };

    if (isMounted.current) {
        initEditor();

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            ref?.current?.destroy();
            ref.current = undefined;

        }
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted.current) {
    return null
  }
}
