import { VStack, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CmdPallete from './CmdPalete/CmdPalete';

interface Props {
  children: ReactNode;
}

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
          <Footer />
        </VStack>
      </Container>
    </>
  );
};
export default Page;
