import { useProjectsQuery } from '@graphql-hooks/generated';
import { withUrqlClient } from 'next-urql';
import { NextPage } from 'next';
import { createUrqlClient } from '@frontend/utils/createUrqlClient';

const ProjectPage: NextPage = () => {
  const [{ data }] = useProjectsQuery();

  return <div>projects data is {JSON.stringify(data?.projects)}</div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ProjectPage);
