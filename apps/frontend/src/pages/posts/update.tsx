import { useIsAuth } from '@frontend/hooks/useIsAuth';
import { NextPage } from 'next';

const UpdatePostPage: NextPage = () => {
  useIsAuth();
  return <div>update post page</div>;
};
export default UpdatePostPage;
