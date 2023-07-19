import { AppProps } from 'next/app';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';

const App = ({ Component, pageProps, router }: AppProps) => {
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}${router.asPath}`;

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, [router.events]);

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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
        />
        <main id="main">
          <Component {...pageProps} />
        </main>
      </Head>
    </>
  );
};
export default App;