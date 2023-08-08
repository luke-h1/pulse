import { HStack } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { RiDoubleQuotesL, RiCodeBoxFill } from 'react-icons/ri';
import MenuButton from '../../MenuButton/MenuButton';

interface Props {
  editor: Editor;
}

const BlockGroup = ({ editor }: Props) => {
  return (
    <HStack flexWrap="wrap">
      <MenuButton
        iconType={RiDoubleQuotesL}
        isActive={editor.isActive('blockquote')}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <MenuButton
        iconType={RiCodeBoxFill}
        isActive={editor.isActive('codeBlock')}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
    </HStack>
  );
};
export default BlockGroup;
