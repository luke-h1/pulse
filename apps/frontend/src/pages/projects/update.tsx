import { useIsAuth } from '@frontend/hooks/useIsAuth';
import { NextPage } from 'next';

const UpdateProjectPage: NextPage = () => {
  useIsAuth();
  return <div>update project page</div>;
};
export default UpdateProjectPage;
