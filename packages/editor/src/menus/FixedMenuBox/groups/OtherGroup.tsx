import { Editor } from '@tiptap/react';
import { RiFormatClear, RiFullscreenFill } from 'react-icons/ri';
import MenuButton from '../../MenuButton/MenuButton';

type Props = {
  editor: Editor;
};

const OtherGroup = ({ editor }: Props) => {
  return (
    <>
      <MenuButton
        iconType={RiFormatClear}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      />
      <MenuButton iconType={RiFullscreenFill} onClick={() => {}} />
    </>
  );
};
export default OtherGroup;
