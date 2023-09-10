import { useRouter } from 'next/router';

const useGetRouterId = (): string | number => {
  const router = useRouter();

  return typeof router.query.id === 'string'
    ? parseInt(router.query.id, 10).toString()
    : -1;
};
export default useGetRouterId;
