import useCurrentUser from '@frontend/hooks/UseCurrentUser';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect } from 'react';

const privateRoutes = [
  '/posts/create',
  '/posts/update',
  '/projects/create',
  '/posts/:id/edit',
  '/projects/:id/edit',
];

export const AuthContext = createContext(undefined);

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const { isAuth, fetching } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !isAuth && privateRoutes.includes(router.pathname)) {
      router.push('/auth/login');
    }
  }, [isAuth, fetching, router]);

  return <>{children}</>;
};
