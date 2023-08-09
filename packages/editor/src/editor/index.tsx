import { Box } from '@chakra-ui/react';
import { useEditor, EditorContent, Extensions } from '@tiptap/react';
import StarterKitExt from '@tiptap/starter-kit';
import UnderlineExt from '@tiptap/extension-underline';
import PlaceholderExt from '@tiptap/extension-placeholder';
import HighlightExt from '@tiptap/extension-highlight';
import SubscriptExt from '@tiptap/extension-subscript';
import SuperscriptExt from '@tiptap/extension-superscript';
import TextAlignExt from '@tiptap/extension-text-align';
import TaskListExt from '@tiptap/extension-task-list';
import TaskItemExt from '@tiptap/extension-task-item';
import CodeBlockLowlightExt from '@tiptap/extension-code-block-lowlight';
import lowlight from 'lowlight';
import styles from './index.module.scss';
import { EditorValue } from '../types/EditorValue';
import { CommandMenuExt, CommandSuggestion } from '../extensions';
import BubbleMenuBox from '../menus/BubbleMenuBox/BubbleMenuBox';
import FixedMenuBox from '../menus/FixedMenuBox/FixedMenuBox';

interface Props {
  hasToolbar?: boolean;
  placeholderText?: string;
  value: EditorValue;
  onChange: (value: EditorValue) => void;
}

const WebEditor = ({
  hasToolbar = true,
  placeholderText,
  value,
  onChange,
}: Props) => {
  const extensions: Extensions = [
    StarterKitExt,
    UnderlineExt,
    HighlightExt,
    SubscriptExt,
    SuperscriptExt,
    TaskListExt,
    CodeBlockLowlightExt.configure({
      lowlight,
      languageClassPrefix: 'language-',
    }),
    TaskItemExt.configure({
      nested: true,
    }),
    TextAlignExt.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
    }),
    PlaceholderExt.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'paragraph') {
          return placeholderText || "Type '/' for commands";
        }

        return placeholderText || 'Write content...';
      },
    }),
    CommandMenuExt.configure({
      suggestion: CommandSuggestion,
    }),
  ];
  const editor = useEditor({
    extensions: [...extensions],
    content: value.raw || value.html,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onUpdate({ editor }) {
      const htmlValue = editor.getHTML();
      const rawValue = editor.getJSON();
      onChange({ raw: rawValue, html: htmlValue });
    },
  });

  return (
    <Box borderWidth={1} rounded="base" bg="white">
      {editor && !hasToolbar && <BubbleMenuBox editor={editor} />}
      {editor && hasToolbar && <FixedMenuBox editor={editor} />}
      <Box px={4} py={2}>
        <EditorContent
          editor={editor}
          className={styles['custom-editor'] as string}
        />
      </Box>
    </Box>
  );
};

export default WebEditor;
