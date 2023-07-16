import { APOLLO_STATE_PROP_NAME, initializeApollo } from '@frontend/apollo';
import { useMemo } from 'react';

export default function useApollo(pageProps: Record<string, unknown>) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const client = useMemo(() => initializeApollo(state), [state]);

  return client;
}
