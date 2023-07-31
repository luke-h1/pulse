import useCurrentUser from '@frontend/hooks/UseCurrentUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect } from 'react';

const privateRoutes = [
  '/posts/create',
  '/projects/create',
  '/posts/:id/edit',
  '/projects/:id/edit',
];

export const AuthContext = createContext(undefined);

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const { isAuth, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth && privateRoutes.includes(router.pathname)) {
      router.push('/auth/login');
    }
  }, [isAuth, loading, router]);

  return <>{children}</>;
};
