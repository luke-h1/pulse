import { Editor } from '@tiptap/react';
import { MdRedo, MdUndo } from 'react-icons/md';
import MenuButton from '../../MenuButton/MenuButton';

interface Props {
  editor: Editor;
}

const HistoryGroup = ({ editor }: Props) => {
  return (
    <>
      <MenuButton
        iconType={MdUndo}
        // @ts-expect-error might be fixed later on in the build
        isActive={editor.can().undo()}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().undo().run()}
        // @ts-expect-error might be fixed later on in the build
        isDisabled={!editor.can().undo()}
      />
      <MenuButton
        iconType={MdRedo}
        // @ts-expect-error might be fixed later on in the build
        isActive={editor.can().redo()}
        // @ts-expect-error might be fixed later on in the build
        onClick={() => editor.chain().focus().redo().run()}
        // @ts-expect-error might be fixed later on in the build
        isDisabled={!editor.can().redo()}
      />
    </>
  );
};
export default HistoryGroup;
