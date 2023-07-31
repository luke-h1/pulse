import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const composeProviders =
  (
    ...providers: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any[]
  ) =>
  ({ children }: Props) => {
    providers.reduceRight((acc, provider) => {
      const [Provider, props] = provider;

      return <Provider {...props}>{acc}</Provider>;
    }, children);
  };
export default composeProviders;
