import { useCurrentUserQuery } from '@graphql-hooks/generated';
import { signOut, useSession } from 'next-auth/react';

const useCurrentUser = () => {
  const session = useSession();

  const [{ data, fetching }] = useCurrentUserQuery({
    pause: session.status === 'unauthenticated' || session.status === 'loading',
  });

  const logout = async () => {
    await signOut();
  };

  return {
    isAuth: !!data?.currentUser.id,
    fetching,
    logout,
    currentUser: data?.currentUser,
  };
};
export default useCurrentUser;
