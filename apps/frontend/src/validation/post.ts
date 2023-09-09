import { z } from 'zod';

const postPayload = {
  title: z.string({
    required_error: 'Title is required',
  }),
  intro: z.string({
    required_error: 'Intro is required',
  }),
  image: z.object({}).nullish(),
  status: z.enum(['PUBLISHED', 'DRAFT', 'SCHEDULED'] as const),
  tags: z.array(
    z.string({
      required_error: 'Tags is required',
    }),
  ),
  // content: z.string({
  //   required_error: 'Content is required',
  // }),
};

const postUpdatePayload = {
  ...postPayload,
};

export const postCreateSchema = z.object(postPayload);
export const postUpdateSchema = z.object(postUpdatePayload);

export type postCreateInput = z.TypeOf<typeof postCreateSchema>;
export type postUpdateInput = z.TypeOf<typeof postUpdateSchema>;
