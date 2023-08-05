import {
  HStack,
  Icon,
  ListItem,
  Text,
  useMenuDescendant,
} from '@chakra-ui/react';
import { useCmdPalleteContext } from '@frontend/context/CmdPalleteContext';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { useKeyPressEvent } from 'react-use';
import { BsArrowReturnLeft } from 'react-icons/bs';

interface Props {
  icon: IconType;
  title: string;
  onClick?: () => void;
  href?: string;
}

const CommandItem = ({ icon, title, href, onClick }: Props) => {
  const { focusedIndex, close } = useCmdPalleteContext();
  const ref = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const { register, index } = useMenuDescendant();

  const isFocused = focusedIndex === index;
  const isExternal = href && href.startsWith('http');

  useEffect(() => {
    if (ref && ref.current) {
      register(ref.current);
    }
  }, [ref, register]);

  const activateItem = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
    close();
  };

  useKeyPressEvent('Enter', () => {
    if (isFocused) {
      activateItem();
    }
  });

  return (
    <ListItem
      ref={ref}
      px={3}
      py={3}
      bg={isFocused ? 'blackAlpha.50' : 'transparent'}
      _hover={{ bg: 'blackAlpha.50' }}
      _dark={{
        bg: isFocused ? 'whiteAlpha.50' : 'transparent',
        _hover: {
          bbg: 'whiteAlpha.50',
        },
      }}
      cursor="pointer"
      onClick={activateItem}
      rounded="md"
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Icon as={icon} />
          <Text>{title}</Text>
          {isExternal && <Icon as={FiArrowUpRight} d="inline" />}
        </HStack>
        {isFocused && (
          <HStack spacing={1}>
            <Text fontSize="xs">Enter</Text>
            <Icon as={BsArrowReturnLeft} h={3} />
          </HStack>
        )}
      </HStack>
    </ListItem>
  );
};

export default CommandItem;
