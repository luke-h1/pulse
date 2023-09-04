import { z } from 'zod';

const loginPayload = {
  email: z.string().email(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(4, {
      message: 'Password must be at least 4 characters',
    }),
};

const registerPayload = {
  ...loginPayload,
  firstName: z.string({
    required_error: 'First name is required',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
  username: z.string({
    required_error: 'Username is required',
  }),
};

export const loginSchema = z.object(loginPayload);
export const registerSchema = z.object(registerPayload);

export type loginInput = z.TypeOf<typeof loginSchema>;
export type registerInput = z.TypeOf<typeof registerSchema>;
