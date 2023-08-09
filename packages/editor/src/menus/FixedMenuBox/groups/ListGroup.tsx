import {
  Box,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Square,
} from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { IconType } from 'react-icons/lib';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiListCheck2,
  RiListOrdered,
  RiListUnordered,
} from 'react-icons/ri';

type ListKey = 'bulletlist' | 'orderedList' | 'taskList';

const dataList: { key: ListKey; title: string; icon: IconType }[] = [
  {
    key: 'bulletlist',
    icon: RiListUnordered,
    title: 'Bullet List',
  },
  {
    key: 'orderedList',
    icon: RiListOrdered,
    title: 'Ordered List',
  },
  {
    key: 'taskList',
    icon: RiListCheck2,
    title: 'Task List',
  },
];

interface Props {
  editor: Editor;
}

const ListGroup = ({ editor }: Props) => {
  const handleSetList = (key?: ListKey) => {
    const focusChain = editor.chain().focus();

    if (key === 'bulletlist') {
      // @ts-expect-error might be fixed later on in the build
      focusChain.toggleBulletList().run();
    }

    if (key === 'orderedList') {
      // @ts-expect-error might be fixed later on in the build
      focusChain.toggleOrderedList().run();
    }

    if (key === 'taskList') {
      // @ts-expect-error might be fixed later on in the build
      focusChain.toggleTaskList().run();
    }
  };

  const renderHeadingList = () => {
    return dataList.map(item => {
      const isActive = editor.isActive(item.key);

      return (
        <MenuItem
          key={item.key}
          icon={<Icon as={item.icon} display="block" />}
          onClick={() => handleSetList(item.key)}
          bg={isActive ? 'blue.100' : 'inherit'}
          color={isActive ? 'blue.500' : 'inherit'}
        >
          {item.title}
        </MenuItem>
      );
    });
  };

  const activeItem = dataList.find(
    item => editor.isActive(item.key) ?? dataList[0],
  ) as (typeof dataList)[0];

  return (
    <HStack spacing={0}>
      <Square
        _hover={{ bg: 'blue.100', cursor: 'pointer' }}
        p={1}
        rounded="base"
        bg={editor.isActive(activeItem?.key) ? 'blue.100' : 'inherit'}
        color={editor.isActive(activeItem?.key) ? 'blue.500' : 'inherit'}
        onClick={() => handleSetList(activeItem?.key)}
      >
        <Icon as={activeItem?.icon} />
      </Square>
      <Menu isLazy>
        {({ isOpen }) => (
          <>
            <MenuButton _hover={{ bg: 'blue.100' }} py={1} rounded="base">
              <HStack>
                <Icon as={isOpen ? RiArrowUpSLine : RiArrowDownSLine} />
              </HStack>
            </MenuButton>
            <MenuList>{renderHeadingList()}</MenuList>
          </>
        )}
      </Menu>
    </HStack>
  );
};

export default ListGroup;
