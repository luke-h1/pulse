import NextApp, { AppContext, AppProps } from 'next/app';
import 'nprogress/nprogress.css';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import useNProgress from '@common/hooks/useNProgress';
import loadEnv from '@common/lib/loadEnv';

const App = ({ Component, pageProps, router }: AppProps) => {
  const canonicalUrl = `${process.env.PUBLIC_URL}${router.asPath}`;

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
              url: `${process.env.PUBLIC_URL}/icons/logo.png`,
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

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  loadEnv();

  return {
    ...appProps,
  };
};
