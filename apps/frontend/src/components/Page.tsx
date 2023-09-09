import { VStack, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer, { FooterLink } from '@ui/components/Footer';
import Header from './Header';
import CmdPallete from './CmdPalete/CmdPalete';

interface Props {
  children: ReactNode;
}

const firstGroup: FooterLink[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/feed',
    label: 'Feed',
  },
  {
    href: '/projects',
    label: 'Projects',
  },
  {
    href: '/posts',
    label: 'Posts',
  },
];

const secondGroup: FooterLink[] = [
  {
    href: '/posts/me',
    label: 'My Posts',
  },
  {
    href: '/projects/me',
    label: 'My Projects',
  },
];

const thirdGroup: FooterLink[] = [
  {
    href: '/uses',
    label: 'Uses',
  },
  {
    href: '/uses/me',
    label: 'My Uses',
  },
  {
    href: '/users/me',
    label: 'My Profile',
  },
];

const Page = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Container
        display="flex"
        maxW="container.md"
        minH={{ base: 'auto', md: '100vh' }}
        px={{ base: 4, lg: 0 }}
        centerContent
      >
        <VStack alignItems="stretch" flex={1} w="full" spacing={16}>
          <VStack as="main" flex={1} w="full" spacing={16}>
            <CmdPallete />
            {children}
          </VStack>
          <Footer
            firstGroup={firstGroup}
            secondGroup={secondGroup}
            thirdGroup={thirdGroup}
          />
        </VStack>
      </Container>
    </>
  );
};
export default Page;
