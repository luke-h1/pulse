import { GraphQLClient } from 'graphql-request';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const searchClient = new GraphQLClient(
  publicRuntimeConfig.PUBLIC_PULSE_API_URL,
  {
    headers: {},
  },
);

export default searchClient;
