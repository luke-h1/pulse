// This file was generated by a custom prisma generator, do not edit manually.
export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const AccountStatus = {
  BANNED: 'BANNED',
  ON_HOLD: 'ON_HOLD',
  ACTIVE: 'ACTIVE',
} as const;

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export const Status = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
} as const;

export type Status = (typeof Status)[keyof typeof Status];
