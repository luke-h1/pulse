import { useMeQuery } from '@graphql-hooks/generated';

const useMe = () => {
  const [{ data, fetching }] = useMeQuery();

  return {
    isAuth: !!data?.me,
    fetching,
    me: data?.me,
  };
};
export default useMe;
