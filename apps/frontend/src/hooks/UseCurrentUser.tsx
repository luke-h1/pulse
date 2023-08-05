import { useMeQuery } from '@graphql-hooks/generated';
import { signOut, useSession } from 'next-auth/react';

const useCurrentUser = () => {
  const session = useSession();

  const [{ data, fetching }] = useMeQuery({
    pause: session.status === 'unauthenticated' || session.status === 'loading',
  });

  const logout = async () => {
    await signOut();
  };

  return {
    isAuth: !!data?.me?.id,
    fetching,
    logout,
    currentUser: data?.me,
  };
};
export default useCurrentUser;
