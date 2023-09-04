import { useIsAuth } from '@frontend/hooks/useIsAuth';
import useMe from '@frontend/hooks/useMe';
import { NextPage } from 'next';

const UserPage: NextPage = () => {
  useIsAuth();
  const { me } = useMe();

  const userId = '1';

  if (userId !== me?.id) {
    return <div>not your page</div>;
  }

  return <div>user page id</div>;
};

export default UserPage;
