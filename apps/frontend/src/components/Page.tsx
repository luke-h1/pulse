import { VStack, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer, { FooterLink } from '@ui/components/Footer';
import { NextSeo, NextSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
import CmdPallete, { CmdLink } from '@ui/components/CmdPalete';
import Header from './Header';

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

const actionLinks: CmdLink = {
  authLinks: [
    {
      title: 'Create Post',
      href: '/posts/create',
    },
    {
      title: 'Create Project',
      href: '/projects/create',
    },
    {
      title: 'My Profile',
      href: '/users/me',
    },
  ],
  unauthLinks: [
    {
      title: 'Login',
      href: '/auth/login',
    },
    {
      title: 'Register',
      href: '/auth/register',
    },
  ],
};

const pageLinks: CmdLink = {
  authLinks: [
    {
      title: 'Feed',
      href: '/feed',
    },
    {
      title: 'Posts',
      href: '/posts',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
  ],
};

interface Props {
  children: ReactNode;
  seo: NextSeoProps;
}

const Page = ({ children, seo }: Props) => {
  const router = useRouter();
  return (
    <>
      <NextSeo
        {...seo}
        canonical={`${process.env.PUBLIC_URL}${router.asPath}`}
        openGraph={{
          url: `${process.env.PUBLIC_URL}${router.asPath}`,
          ...seo.openGraph,
        }}
      />
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
            <CmdPallete actionLinks={actionLinks} pageLinks={pageLinks} />
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
