import { getSession } from 'next-auth/react';
import { isServer } from '@common/hooks';

export const TOKEN_NAME = 'pulse';

export async function getAuthToken() {
  const session = await getSession();

  return session?.token;
}

// eslint-disable-next-line consistent-return
export function setAuthToken(token: string) {
  if (!isServer) {
    return localStorage.setItem(TOKEN_NAME, token);
  }
}
