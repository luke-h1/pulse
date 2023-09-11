import { Role, useMeQuery } from '@graphql-hooks/generated';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const [{ data, fetching }] = useMeQuery();

  const isAuth = !fetching && data?.me?.role === Role.Admin;

  if (!isAuth) {
    return <div>UNAUTHORIZED</div>;
  }

  return <>{children}</>;
};
export default AuthGuard;
