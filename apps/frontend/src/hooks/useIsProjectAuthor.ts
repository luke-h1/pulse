import { ProjectQuery } from '@graphql-hooks/generated';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useIsProjectAuthor = (
  fetching: boolean,
  project?: ProjectQuery['project'],
) => {
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !project?.isAuthor) {
      router.push('/unauthorized');
    }
  }, [router, project, fetching]);
};
export default useIsProjectAuthor;
