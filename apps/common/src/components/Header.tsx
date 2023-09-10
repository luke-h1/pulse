import {
  HStack,
  Heading,
  IconButton,
  Link,
  Tooltip,
  Container,
} from '@chakra-ui/react';
import { useCmdPalleteContext } from '@common/context/CmdPalleteContext';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { FiCommand } from 'react-icons/fi';
import { BiPulse } from 'react-icons/bi';

const Header = () => {
  const { open: openCommandPallete } = useCmdPalleteContext();
  const [shortcut, setShortcut] = useState('');

  useEffect(() => {
    setShortcut(
      navigator.userAgent.indexOf('Mac OS X') !== -1 ? 'Cmd + K' : 'Ctrl + K',
    );
  }, [setShortcut]);

  return (
    <HStack
      as="nav"
      position="sticky"
      zIndex="popover"
      top={0}
      alignItems="center"
      justifyContent="space-between"
      w="full"
      mb={16}
      py={3}
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      insetX={0}
      transitionDuration="normal"
      transitionProperty="background"
    >
      <Container
        alignItems="center"
        justifyContent="space-between"
        display="flex"
        maxW="container.md"
        px={{ base: 4, lg: 0 }}
      >
        <Heading size="sm">
          <Link as={NextLink} href="/">
            <BiPulse size={50} />
          </Link>
        </Heading>
        <HStack alignItems="center" spacing={{ base: 0, md: 2 }}>
          <Tooltip label={`Command Palette (${shortcut})`}>
            <IconButton
              aria-label="toggle theme"
              icon={<FiCommand />}
              onClick={openCommandPallete}
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        </HStack>
      </Container>
    </HStack>
  );
};

export default Header;
