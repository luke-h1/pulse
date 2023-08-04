import { useSignupMutation } from '@graphql-hooks/generated';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [, signup] = useSignupMutation();

      const { data } = await signup({
        token: account?.access_token as string,
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
