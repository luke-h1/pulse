import { useIsAuth } from '@frontend/hooks/useIsAuth';
import { NextPage } from 'next';

const CreateProjectPage: NextPage = () => {
  useIsAuth();
  return <div>create project page</div>;
};
export default CreateProjectPage;
