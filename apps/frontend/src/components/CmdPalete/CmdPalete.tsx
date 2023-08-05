import { useCallback } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  Flex,
  FlexProps,
  Input,
  List,
  ListItem,
  Portal,
  StackProps,
  Text,
  useColorMode,
  useMenu,
  VStack,
} from '@chakra-ui/react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { createDescendantContext } from '@chakra-ui/descendant';
import { CgArrowRight } from 'react-icons/cg';
import { useKeyPressEvent } from 'react-use';
import {
  ActionItem,
  PageItem,
  ThemeItem,
  useCmdPalleteContext,
} from '@frontend/context/CmdPalleteContext';
import useCurrentUser from '@frontend/hooks/UseCurrentUser';
import CommandItem from './CommandItem';

export const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<HTMLElement>();

const backdropVariants: Variants = {
  initial: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  enter: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
};

const commandPaleteVariants: Variants = {
  initial: {
    scale: 0.9,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  enter: {
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  exit: {
    scale: 0.9,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
};

const MotionFlex = motion<FlexProps>(Flex);
const MotionVStack = motion<StackProps>(VStack);

const CmdPallete = () => {
  const {
    close,
    commands,
    filterCommands,
    focusedIndex,
    isOpen,
    open,
    setFocusedIndex,
  } = useCmdPalleteContext();
  const { descendants } = useMenu();
  const { colorMode, toggleColorMode } = useColorMode();

  const hidePallete = useCallback(() => {
    close();
    setFocusedIndex(0);
  }, [close, setFocusedIndex]);

  useKeyPressEvent(e => {
    if (!isOpen && e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
      e.preventDefault();
      open();
    }
    return true;
  });

  useKeyPressEvent('Escape', hidePallete);

  useKeyPressEvent('ArrowDown', () => {
    const next = descendants.nextEnabled(focusedIndex);
    if (next) {
      setFocusedIndex(next.index);
      next.node.focus();
      next.node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  });

  useKeyPressEvent('ArrowUp', () => {
    const prev = descendants.prevEnabled(focusedIndex);
    if (prev) {
      setFocusedIndex(prev.index);
      prev.node.focus();
      prev.node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  });

  const { currentUser, fetching: currentUserFetching } = useCurrentUser();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Portal>
          <MotionFlex
            onClick={close}
            variants={backdropVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            position="fixed"
            inset={0}
            bg="whiteAlpha.800"
            _dark={{
              bg: 'blackAlpha.800',
            }}
            zIndex="tooltip"
            alignItems="flex-start"
            justifyContent="center"
          >
            <MotionVStack
              variants={commandPaleteVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              mt={{ base: 12, md: 24 }}
              mx={2}
              onClick={e => e.stopPropagation()}
              bg="white"
              _dark={{
                bg: 'gray.900',
              }}
              shadow="2xl"
              maxW="3xl"
              maxH={{ base: '40vh', md: 'md' }}
              overflow="hidden"
              w="full"
              rounded="md"
              borderWidth="1px"
              borderStyle="solid"
            >
              <Input
                px={3}
                py={4}
                borderBottomWidth="1px"
                borderBottomStyle="solid"
                autoFocus
                onChange={e => filterCommands(e.currentTarget.value)}
                placeholder="Search commands"
                rounded="none"
                variant="unstyled"
              />
              <List overflow="auto" w="full" pb={2} px={2}>
                <MenuDescendantsProvider value={descendants}>
                  {Object.keys(commands).map(section => (
                    <>
                      {/* @ts-expect-error testing */}
                      {commands[section].length > 0 && (
                        <ListItem key={section}>
                          <Text
                            my={2}
                            color="gray.500"
                            fontSize="xs"
                            textTransform="capitalize"
                          >
                            {section}
                          </Text>
                        </ListItem>
                      )}
                      {/* @ts-expect-error testing */}
                      {commands[section].map(
                        (command: PageItem | ThemeItem) => {
                          switch (section) {
                            case 'pages': {
                              const { title, href } = command as PageItem;
                              return (
                                <CommandItem
                                  key={title}
                                  title={title}
                                  href={href}
                                  icon={CgArrowRight}
                                />
                              );
                            }

                            case 'unauthenticated': {
                              if (!currentUserFetching && currentUser) {
                                return null;
                              }

                              const { title, href } = command as PageItem;

                              return (
                                <CommandItem
                                  key={title}
                                  title={title}
                                  href={href}
                                  icon={CgArrowRight}
                                />
                              );
                            }

                            case 'authenticated': {
                              if (!currentUserFetching && !currentUser) {
                                return null;
                              }

                              const { title, href, action } =
                                command as ActionItem;

                              return (
                                <CommandItem
                                  key={title}
                                  title={title}
                                  onClick={action}
                                  href={href}
                                  icon={CgArrowRight}
                                />
                              );
                            }

                            case 'themes': {
                              const { title, id } = command as ThemeItem;

                              const icon =
                                colorMode === 'dark' ? IoSunny : IoMoon;

                              return (
                                <CommandItem
                                  key={id}
                                  title={title}
                                  icon={icon}
                                  onClick={toggleColorMode}
                                />
                              );
                            }

                            default:
                              return null;
                          }
                        },
                      )}
                    </>
                  ))}
                </MenuDescendantsProvider>
              </List>
            </MotionVStack>
          </MotionFlex>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default CmdPallete;
