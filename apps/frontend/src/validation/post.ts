import { z } from 'zod';

const postPayload = {
  title: z.string({
    required_error: 'Title is required',
  }),
  intro: z.string({
    required_error: 'Intro is required',
  }),
  image: z.string().nullable(),
  tags: z.string().array(),
  content: z.string(),
};

const postUpdatePayload = {
  id: z.string({
    required_error: 'ID is a required field',
  }),
  ...postPayload,
};

export const postCreateSchema = z.object(postPayload);
export const postUpdateSchema = z.object(postUpdatePayload);

export type postCreateInput = z.TypeOf<typeof postCreateSchema>;
export type postUpdateInput = z.TypeOf<typeof postUpdateSchema>;
