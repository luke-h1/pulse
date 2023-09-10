import { useCallback } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  Flex,
  FlexProps,
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
import { useCmdPalleteContext } from '@common/context/CmdPalleteContext';
import useMe from '@common/hooks/useMe';
import { useLogoutMutation } from '@graphql-hooks/generated';
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

export interface CmdLink {
  unauthLinks?: {
    title: string;
    href?: string;
  }[];
  authLinks: {
    title: string;
    href?: string;
  }[];
}

interface Props {
  pageLinks: CmdLink;
  actionLinks: CmdLink;
}

const CmdPallete = ({ actionLinks, pageLinks }: Props) => {
  const { close, focusedIndex, isOpen, open, setFocusedIndex } =
    useCmdPalleteContext();
  const { descendants } = useMenu();
  const { colorMode, toggleColorMode } = useColorMode();
  const [, logout] = useLogoutMutation();

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

  const { isAuth } = useMe();

  const onLogout = () => {
    logout({});
  };

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
              <List overflow="auto" w="full" pb={2} px={2}>
                <MenuDescendantsProvider value={descendants}>
                  <ListItem>
                    <Text
                      my={2}
                      color="gray.500"
                      fontSize="xs"
                      textTransform="capitalize"
                    >
                      Pages
                    </Text>
                    <CommandItem title="Home" href="/" icon={CgArrowRight} />
                    {isAuth &&
                      pageLinks.authLinks.map(link => (
                        <CommandItem
                          title={link.title}
                          href={link.href}
                          icon={CgArrowRight}
                          key={link.title}
                        />
                      ))}
                  </ListItem>
                  <ListItem>
                    <Text
                      my={2}
                      color="gray.500"
                      fontSize="xs"
                      textTransform="capitalize"
                    >
                      Actions
                    </Text>
                    {!isAuth
                      ? actionLinks.unauthLinks?.map(link => (
                          <CommandItem
                            title={link.title}
                            href={link.href}
                            icon={CgArrowRight}
                            key={link.title}
                          />
                        ))
                      : actionLinks.authLinks.map(link => (
                          <CommandItem
                            title={link.title}
                            href={link.href}
                            icon={CgArrowRight}
                            key={link.title}
                          />
                        ))}
                    {isAuth && (
                      <CommandItem
                        title="Logout"
                        onClick={onLogout}
                        icon={CgArrowRight}
                      />
                    )}
                  </ListItem>
                  <ListItem>
                    <Text
                      my={2}
                      color="gray.500"
                      fontSize="xs"
                      textTransform="capitalize"
                    >
                      Theme
                    </Text>
                    <CommandItem
                      onClick={toggleColorMode}
                      title="Toggle theme"
                      icon={colorMode === 'dark' ? IoSunny : IoMoon}
                    />
                  </ListItem>
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
