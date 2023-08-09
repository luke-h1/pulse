import { Box, Center, HStack, Icon, Square, Text } from '@chakra-ui/react';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { HiOutlineArchive } from 'react-icons/hi';
import styles from './index.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CommandList = forwardRef<any, any>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number): void => {
    const item = props.items[index];

    if (item) {
      props.command({
        id: item,
      });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex - 1 + props.items.length) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useEffect(() => {
    const commandElm = document.querySelector(
      `#command-suggestion__item-${selectedIndex}`,
    );
    commandElm?.scrollIntoView();
  }, [selectedIndex]);

  useImperativeHandle(ref, () => ({
    onkeydown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <Box
      shadow="base"
      rounded="base"
      borderWidth={1}
      bg="white"
      w="300px"
      maxH="300px"
      overflow="auto"
      className={styles['command-list-container'] as string}
    >
      {props.items.length > 0 ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props.items.map((item: any, index: number) => (
          <HStack
            id={`command-suggestion__item-${index}`}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => selectItem(index)}
            bg={index === selectedIndex ? 'gray.100' : 'inherit'}
            _hover={{
              bg: 'gray.50',
              cursor: 'pointer',
            }}
            align="center"
            px={4}
            py={2}
          >
            <Square p={2} borderWidth={1} rounded="base" bg="white">
              <Icon as={item.icon} boxSize={6} color="gray.600" />
            </Square>
            <Box flex={1}>
              <Text>{item.title}</Text>
              {item.desc && (
                <Text color="gray.400" fontSize="sm">
                  {item.desc}
                </Text>
              )}
            </Box>
          </HStack>
        ))
      ) : (
        <Center flexDir="column" px={4} py={2}>
          <Icon as={HiOutlineArchive} boxSize={6} color="gray.500" />
          <Text fontSize="sm" color="gray.400">
            No results
          </Text>
        </Center>
      )}
    </Box>
  );
});

CommandList.displayName = 'CommandList';
