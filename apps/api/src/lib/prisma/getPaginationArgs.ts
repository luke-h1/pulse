import { Prisma } from '@prisma/client';

export interface SearchArgs {
  input: {
    cursor: string;
    order?: 'asc' | 'desc';
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
            [args.input.orderBy || 'createdAt']: args.input?.order,
          },
  };
};

// TODO LH: consolidate into one function via providing a string literal to determine which model to use
export const getProjectPaginationArgs = (
  args: SearchArgs,
  isFirst: boolean,
  filter?: Prisma.ProjectScalarWhereInput,
) => {
  return {
    take: 10,
    skip: isFirst ? 0 : 1,
    cursor: isFirst ? undefined : { id: args.input.cursor },
    where: filter,
    include: {
      author: true,
    },
    orderBy: {
      [args?.input?.orderBy || 'createdAt']: args.input?.order,
    },
  };
};

// TODO: constrain type of object here to prisma fields and make generic
export const getPostPaginationArgs = (
  args: SearchArgs,
  isFirst: boolean,
  filter?: Prisma.PostScalarWhereInput,
) => {
  return {
    take: 10,
    skip: isFirst ? 0 : 1,
    cursor: isFirst ? undefined : { id: args.input.cursor },
    where: filter,
    include: {
      author: true,
    },
    orderBy: {
      [args?.input?.orderBy || 'createdAt']: args.input?.order,
    },
  };
};
