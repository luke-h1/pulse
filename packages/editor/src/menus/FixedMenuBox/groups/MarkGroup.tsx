import { HStack } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import {
  RiBold,
  RiUnderline,
  RiItalic,
  RiStrikethrough,
  RiTBoxFill,
  RiSubscript,
  RiSuperscript,
} from 'react-icons/ri';
import MenuButton from '../../MenuButton/MenuButton';

type Props = {
  editor: Editor;
};

export const MarkGroup = ({ editor }: Props) => {
  return (
    <>
      <MenuButton
        iconType={RiBold}
        isActive={editor.isActive('bold')}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <MenuButton
        iconType={RiUnderline}
        isActive={editor.isActive('underline')}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <MenuButton
        iconType={RiItalic}
        isActive={editor.isActive('italic')}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <MenuButton
        iconType={RiStrikethrough}
        isActive={editor.isActive('strike')}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <MenuButton
        iconType={RiTBoxFill}
        isActive={editor.isActive('highlight')}
        // @ts-expect-error might be fixed later on in the build

        onClick={() => editor.chain().focus().toggleHighlight().run()}
      />
      <MenuButton
        iconType={RiSubscript}
        isActive={editor.isActive('subscript')}
        // @ts-expect-error might be fixed later on in the build

        onClick={() => editor.chain().focus().toggleSubscript().run()}
      />
      <MenuButton
        iconType={RiSuperscript}
        isActive={editor.isActive('superscript')}
        // @ts-expect-error might be fixed later on in the build

        onClick={() => editor.chain().focus().toggleSuperscript().run()}
      />
    </>
  );
};
