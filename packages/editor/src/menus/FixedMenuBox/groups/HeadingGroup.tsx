import {
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { IconType } from 'react-icons/lib';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
} from 'react-icons/ri';

type HeadingLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const dataList: { level: HeadingLevel; title: string; icon: IconType }[] = [
  {
    level: 0,
    icon: RiParagraph,
    title: 'Paragraph',
  },
  {
    level: 1,
    icon: RiH1,
    title: 'Heading 1',
  },
  {
    level: 2,
    icon: RiH2,
    title: 'Heading 2',
  },
  {
    level: 3,
    icon: RiH3,
    title: 'Heading 3',
  },
  {
    level: 4,
    icon: RiH4,
    title: 'Heading 4',
  },
  {
    level: 5,
    icon: RiH5,
    title: 'Heading 5',
  },
  {
    level: 6,
    icon: RiH6,
    title: 'Heading 6',
  },
];

interface Props {
  editor: Editor;
}

const HeadingGroup = ({ editor }: Props) => {
  const handleToggleHeading = (level: HeadingLevel) => {
    const focusChain = editor.chain().focus();

    if (!level) {
      // @ts-expect-error might be fixed later on in the build
      focusChain.setParagraph().run();
    }

    focusChain
      // @ts-expect-error might be fixed later on in the build
      .toggleHeading({
        level,
      })
      .run();
  };

  const renderHeadingList = () => {
    return dataList.map(item => {
      const isActive = item.level
        ? editor.isActive('heading', { level: item.level })
        : editor.isActive('paragraph');

      return (
        <MenuItem
          key={item.level}
          icon={<Icon as={item.icon} display="block" />}
          onClick={() => handleToggleHeading(item.level)}
          bg={isActive ? 'blue.100' : 'inherit'}
          color={isActive ? 'blue.500' : 'inherit'}
        >
          {item.title}
        </MenuItem>
      );
    });
  };

  const activeItem = dataList.find(item => {
    if (!item.level) {
      return editor.isActive('paragraph');
    }

    return editor.isActive('heading', { level: item.level }) ?? dataList[0];
  });

  return (
    <Menu isLazy>
      {({ isOpen }) => (
        <>
          <MenuButton
            borderWidth={1}
            bg="white"
            px={2}
            rounded="base"
            _hover={{ bg: 'blue.100' }}
          >
            <HStack>
              <Icon as={activeItem?.icon} />
              <Text>{activeItem?.title || 'Heading'}</Text>
              <Icon as={isOpen ? RiArrowUpSLine : RiArrowDownSLine} />
            </HStack>
          </MenuButton>
          <MenuList>{renderHeadingList()}</MenuList>
        </>
      )}
    </Menu>
  );
};

export default HeadingGroup;
