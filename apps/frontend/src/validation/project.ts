import { z } from 'zod';

const projectPayload = {
  title: z.string({
    required_error: 'Title is required',
  }),
  intro: z.string({
    required_error: 'Intro is required',
  }),
  content: z.object({}).required({
    message: 'Content is required',
  }),
  image: z.object({}).or(z.string()).nullish(),
  appStoreUrl: z
    .string()
    .nullish()
    .refine(val => {
      if (!val) {
        return true;
      }

      const APP_STORE_URL_REGEX =
        /^https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/[a-z0-9-]+\/[0-9]{9}$/;

      return APP_STORE_URL_REGEX.test(val);
    }),
  playStoreUrl: z
    .string()
    .nullish()
    .refine(val => {
      if (!val) {
        return true;
      }

      const PLAY_STORE_URL_REGEX =
        /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-z0-9.]+$/;

      return PLAY_STORE_URL_REGEX.test(val);
    }),
  githubUrl: z
    .string()
    .nullish()
    .refine(val => {
      if (!val) {
        return true;
      }

      const GITHUB_URL_REGEX = /^https:\/\/github.com\//;

      return GITHUB_URL_REGEX.test(val);
    }),
  siteUrl: z
    .string()
    .nullish()
    .refine(val => {
      if (!val) {
        return true;
      }

      const SITE_URL_REGEX =
        /^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(:[0-9]+)?(\/.*)?$/;

      return SITE_URL_REGEX.test(val);
    }),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED']),
};

const projectUpdatePayload = {
  ...projectPayload,
};

export const projectCreateSchema = z.object(projectPayload);
export const projectUpdateSchema = z.object(projectUpdatePayload);

export type projectCreateInput = z.TypeOf<typeof projectCreateSchema>;
export type projectUpdateInput = z.TypeOf<typeof projectUpdateSchema>;
