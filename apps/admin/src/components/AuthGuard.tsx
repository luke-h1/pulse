import { Role, useMeQuery } from '@graphql-hooks/generated';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  const isAuth = !fetching && data?.me?.role === Role.Admin;

  useEffect(() => {
    if (!isAuth) {
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
export default AuthGuard;
