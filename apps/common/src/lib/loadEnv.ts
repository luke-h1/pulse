import getConfig from 'next/config';

/**
 * Super annoying hack because Next.js inlines environment variables
 * and we need to access them in the browser.
 * this means when we deploy on a platform that is **not** Vercel
 * we need to add the environment variables to the publicRuntimeConfig
 * in next.config.js
 * and then assign them to the process.env here so we don't have to do
 *  `const { MY_ENV_VAR } = publicRuntimeConfig`
 * this also means we have to opt out of static optimization
 * because we have to load them in getInitialProps in _app.tsx
 */
export default function loadEnv() {
  const { publicRuntimeConfig } = getConfig();

  Object.assign(process.env, publicRuntimeConfig, {
    APP_ROOT_ID: '__next',
  });
}
