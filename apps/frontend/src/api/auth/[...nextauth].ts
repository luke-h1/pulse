import { initializeApollo } from '@frontend/apollo';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { SignupDocument, SignupMutation } from '@apollo-hooks/generated';

export default NextAuth({
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.JWT_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const apolloClient = initializeApollo();

      const { data } = await apolloClient.mutate<SignupMutation>({
        mutation: SignupDocument,
        variables: {
          token: account?.access_token,
        },
      });

      if (account) {
        // user exists
        // eslint-disable-next-line no-param-reassign
        account.serverToken = data?.signup;
      }

      return true;
    },
    jwt({ token, account }) {
      if (account) {
        // eslint-disable-next-line no-param-reassign
        token.serverToken = account.serverToken;
      }

      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.token = token?.serverToken as string;
      return session;
    },
  },
});
