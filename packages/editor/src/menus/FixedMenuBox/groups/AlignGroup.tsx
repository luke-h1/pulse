import {
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { IconType } from 'react-icons/lib';
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from 'react-icons/ri';

type AlignKey = 'left' | 'center' | 'right' | 'justify';

const dataList: { key: AlignKey; title: string; icon: IconType }[] = [
  {
    key: 'left',
    icon: RiAlignLeft,
    title: 'Left',
  },
  {
    key: 'center',
    icon: RiAlignCenter,
    title: 'Center',
  },
  {
    key: 'right',
    icon: RiAlignRight,
    title: 'Right',
  },
  {
    key: 'justify',
    icon: RiAlignJustify,
    title: 'Justify',
  },
];

interface Props {
  editor: Editor;
}

const AlignGroup = ({ editor }: Props) => {
  const handleSetAlign = (key: AlignKey) => {
    const focusChain = editor.chain().focus();
    // @ts-expect-error might be fixed later on in the build
    focusChain.setTextAlign(key).run();
  };

  const renderHeadingList = () => {
    return dataList.map(item => {
      const isActive = editor.isActive({
        textAlign: item.key,
      });

      return (
        <MenuItem
          key={item.key}
          icon={<Icon as={item.icon} display="block" />}
          onClick={() => handleSetAlign(item.key)}
          bg={isActive ? 'blue.100' : 'inherit'}
          color={isActive ? 'blue.500' : 'inherit'}
        >
          {item.title}
        </MenuItem>
      );
    });
  };

  const activeItem = dataList.find(
    item => editor.isActive({ textAlign: item.key }) ?? dataList[0],
  );

  return (
    <Menu isLazy>
      {({ isOpen }) => (
        <>
          <MenuButton _hover={{ bg: 'blue.100' }} p={1} rounded="base">
            <HStack spacing={1}>
              <Icon as={activeItem?.icon} />
              <Icon as={isOpen ? RiArrowUpSLine : RiArrowDownSLine} />
            </HStack>
          </MenuButton>
          <MenuList>{renderHeadingList()}</MenuList>
        </>
      )}
    </Menu>
  );
};

export default AlignGroup;
