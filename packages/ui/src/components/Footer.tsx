import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { chakra, Stack, VStack, Divider, Link, Text } from '@chakra-ui/react';

export interface FooterLink {
  label: string;
  href: string;
}

interface Props {
  firstGroup: FooterLink[];
  secondGroup: FooterLink[];
  thirdGroup: FooterLink[];
}

const Footer = ({ firstGroup, secondGroup, thirdGroup }: Props) => {
  const router = useRouter();

  return (
    <VStack as="footer" alignItems="flex-start" pb={8} spacing={8}>
      <Divider />
      <Stack
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        w="full"
        spacing={{ base: 2, md: 8 }}
      >
        <VStack alignItems="flex-start">
          {firstGroup.map(item => (
            <Link
              key={item.href}
              as={NextLink}
              color={router.pathname === item.href ? 'purple.500' : 'gray.500'}
              href={item.href}
              isExternal={item.href.startsWith('http')}
            >
              {item.label}
            </Link>
          ))}
        </VStack>
        <VStack alignItems="flex-start">
          {secondGroup.map(item => (
            <Link
              key={item.href}
              as={NextLink}
              color={router.pathname === item.href ? 'purple.500' : 'gray.500'}
              href={item.href}
              isExternal={item.href.startsWith('http')}
            >
              {item.label}
            </Link>
          ))}
        </VStack>
        <VStack alignItems="flex-start">
          {thirdGroup.map(item => (
            <Link
              key={item.href}
              as={NextLink}
              color={router.pathname === item.href ? 'purple.500' : 'gray.500'}
              href={item.href}
              isExternal={item.href.startsWith('http')}
            >
              {item.label}
            </Link>
          ))}
        </VStack>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent={{
          base: 'center',
          md: 'space-between',
        }}
        direction={{ base: 'column', md: 'row' }}
        gridRowGap={4}
        w="full"
        spacing={0}
      >
        <Text color="gray.500" fontSize="sm">
          ©{' '}
          <chakra.span as="time" color="purple.500">
            {new Date().getFullYear()}
          </chakra.span>{' '}
          Pulse
        </Text>
      </Stack>
    </VStack>
  );
};
export default Footer;
