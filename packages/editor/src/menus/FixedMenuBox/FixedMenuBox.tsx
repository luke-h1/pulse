import { HStack } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import DividerGroup from './groups/DividerGroup';
import HistoryGroup from './groups/HistoryGroup';
import HeadingGroup from './groups/HeadingGroup';
import { MarkGroup } from './groups/MarkGroup';
import AlignGroup from './groups/AlignGroup';
import ListGroup from './groups/ListGroup';
import BlockGroup from './groups/BlockGroup';
import OtherGroup from './groups/OtherGroup';

interface Props {
  editor: Editor;
}

const FixedMenuBox = ({ editor }: Props) => {
  return (
    <HStack px={2} py={2} bg="gray.100" roundedTop="base" flexWrap="wrap">
      {/* <AddMoreGroup editor={editor} /> */}
      <DividerGroup />
      <HistoryGroup editor={editor} />
      <DividerGroup />
      <HeadingGroup editor={editor} />
      <MarkGroup editor={editor} />
      <DividerGroup />
      <AlignGroup editor={editor} />
      <DividerGroup />
      <ListGroup editor={editor} />
      <DividerGroup />
      <BlockGroup editor={editor} />
      <DividerGroup />
      <OtherGroup editor={editor} />
    </HStack>
  );
};
export default FixedMenuBox;
