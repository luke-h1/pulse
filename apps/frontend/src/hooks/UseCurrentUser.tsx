import { useCurrentUserQuery } from '@apollo-hooks/generated';
import { signOut, useSession } from 'next-auth/react';

const useCurrentUser = () => {
  const session = useSession();

  const { data, loading, client } = useCurrentUserQuery({
    skip: session.status === 'unauthenticated' || session.status === 'loading',
  });

  const logout = async () => {
    await client.resetStore();
    await signOut();
  };

  return {
    isAuth: !!data?.currentUser.id,
    loading,
    logout,
    currentUser: data?.currentUser,
  };
};
export default useCurrentUser;
