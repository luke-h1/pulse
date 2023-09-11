import { Role, useMeQuery } from '@graphql-hooks/generated';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && data?.me?.role !== Role.Admin) {
      router.replace(`/auth/login?next=${router.pathname}`);
    }
  }, [fetching, data, router]);
};
