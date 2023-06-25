import { Prisma } from '@prisma/client';

export interface SearchArgs {
  input: {
    cursor: string;
    order: 'asc' | 'desc';
    orderBy: string;
    search: string;
  };
}

export const getUserPaginationArgs = (
  args: SearchArgs,
  isFirst: boolean,
  filter?: Prisma.UserScalarWhereInput,
) => {
  return {
    take: 10,
    skip: isFirst ? 0 : 1,
    cursor: isFirst ? undefined : { id: args.input.cursor },
    where: filter,
    orderBy:
      args.input.orderBy === 'projectsCount'
        ? {
            projects: {
              _count: args.input.order,
            },
          }
        : {
            [args.input.orderBy || 'createdAt']: args.input.order,
          },
  };
};
