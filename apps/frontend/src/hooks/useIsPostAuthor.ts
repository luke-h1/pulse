import { PostQuery } from '@graphql-hooks/generated';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useIsPostAuthor = (fetching: boolean, post?: PostQuery['post']) => {
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !post?.isAuthor) {
      router.push('/unauthorized');
    }
  }, [router, post, fetching]);
};
export default useIsPostAuthor;
