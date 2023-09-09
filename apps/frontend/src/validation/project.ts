import { z } from 'zod';

const projectPayload = {
  title: z.string({
    required_error: 'Title is required',
  }),
  intro: z.string({
    required_error: 'Intro is required',
  }),
  image: z.object({}).nullish(),
  content: z.string({
    required_error: 'Content is required',
  }),
  appStoreUrl: z.string().nullish(),
  playStoreUrl: z.string().nullish(),
  githubUrl: z.string().nullish(),
  siteUrl: z.string().nullish(),
  tags: z.array(
    z.string({
      required_error: 'Tags is required',
    }),
  ),
};

const projectUpdatePayload = {
  ...projectPayload,
};

export const projectCreateSchema = z.object(projectPayload);
export const projectUpdateSchema = z.object(projectUpdatePayload);

export type projectCreateInput = z.TypeOf<typeof projectCreateSchema>;
export type projectUpdateInput = z.TypeOf<typeof projectUpdateSchema>;
