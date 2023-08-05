import { CookieOptions } from 'express-session';

const buildCookieOptions = () => {
  const options: CookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.ENVIRONMENT === 'production',
    domain:
      process.env.ENVIRONMENT === 'production' ? '.subdomain.com' : undefined,
    signed: process.env.ENVIRONMENT === 'production',
  };

  return options;
};
export default buildCookieOptions;
