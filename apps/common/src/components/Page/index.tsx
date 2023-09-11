import { useRouter } from 'next/router';
import { NextSeo, NextSeoProps } from 'next-seo';
import { ReactNode } from 'react';
import { VStack, Container } from '@chakra-ui/react';
import Footer from '@ui/components/Footer';
import CmdPallete from '@ui/components/CmdPalete';
import Header from '@common/components/Header';
import { adminMeta, frontendMeta } from './meta';

interface Props {
  children: ReactNode;
  seo: NextSeoProps;
  site: 'frontend' | 'admin';
}

const Page = ({ children, seo, site }: Props) => {
  const pageMeta = site === 'admin' ? adminMeta : frontendMeta;

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
            <CmdPallete
              actionLinks={pageMeta.actionLinks}
              pageLinks={pageMeta.pageLinks}
            />
            {children}
          </VStack>
          <Footer
            firstGroup={pageMeta.footerLinks.firstGroup}
            secondGroup={pageMeta.footerLinks.secondGroup}
            thirdGroup={pageMeta.footerLinks.thirdGroup}
          />
        </VStack>
      </Container>
    </>
  );
};

export default Page;
