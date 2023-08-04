import { AppProps } from 'next/app';
import 'nprogress/nprogress.css';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { AuthContextProvider } from '@frontend/context/AuthContext';
import useNProgress from '@frontend/hooks/useNProgress';
import { ChakraProvider } from '@chakra-ui/react';

type CustomAppProps = AppProps<{ session: Session }> & {
  Component: {
    auth?: boolean;
  };
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: CustomAppProps) => {
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}${router.asPath}`;
  useNProgress();

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | pulse"
        title="pulse"
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          locale: 'en_GB',
          url: canonicalUrl,
          site_name: 'pulse',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/icons/logo.png`,
              alt: 'logo for pulse',
              width: 1200,
              height: 630,
            },
          ],
        }}
      />
      <SessionProvider session={session}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
          />
        </Head>
        <ChakraProvider>
          <main id="main">
            {Component.auth ? (
              <AuthContextProvider>
                <Component {...pageProps} />
              </AuthContextProvider>
            ) : (
              <Component {...pageProps} />
            )}
          </main>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};
export default App;
