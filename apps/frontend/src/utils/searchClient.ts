import { GraphQLClient } from 'graphql-request';

const searchClient = new GraphQLClient(process.env.NEXT_PUBLIC_PULSE_API_URL, {
  headers: {},
});

export default searchClient;
