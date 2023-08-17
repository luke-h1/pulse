import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };

/* eslint-disable */
// @ts-ignore
// DO NOT EDIT
// This file is automatically generated, run pnpm gen to update

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED',
  OnHold = 'ON_HOLD',
}

export type CountResponse = {
  __typename?: 'CountResponse';
  count?: Maybe<Scalars['Float']['output']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type EnumAccountStatusFilter = {
  equals?: InputMaybe<AccountStatus>;
  in?: InputMaybe<Array<AccountStatus>>;
  not?: InputMaybe<NestedEnumAccountStatusFilter>;
  notIn?: InputMaybe<Array<AccountStatus>>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type EnumStatusFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  code?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<Scalars['JSON']['input']>;
  path?: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostResponse;
  createProject: ProjectResponse;
  deleteAccount: Scalars['Boolean']['output'];
  deleteAllPosts: Scalars['Boolean']['output'];
  deleteAllProjects: Scalars['Boolean']['output'];
  /** Deletes a post */
  deletePost: Scalars['Boolean']['output'];
  deletePostAsAdmin: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteProjectAdmin: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  /** Updates a post */
  updatePost: PostResponse;
  updateProject: ProjectResponse;
  updateUserDetails: UserResponse;
  updateUserRole: UserResponse;
  updateUserStatus: UserResponse;
  /** Returns all user slugs */
  userSlugs?: Maybe<SlugsResponse>;
};

export type MutationCreatePostArgs = {
  options: PostCreateInput;
};

export type MutationCreateProjectArgs = {
  options: ProjectCreateInput;
};

export type MutationDeletePostArgs = {
  slug: Scalars['String']['input'];
};

export type MutationDeletePostAsAdminArgs = {
  slug: Scalars['String']['input'];
};

export type MutationDeleteProjectArgs = {
  slug: Scalars['String']['input'];
};

export type MutationDeleteProjectAdminArgs = {
  slug: Scalars['String']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  options: UserLoginInput;
};

export type MutationRegisterArgs = {
  options: UserRegisterInput;
};

export type MutationUpdatePostArgs = {
  options: PostUpdateInput;
  slug: Scalars['String']['input'];
};

export type MutationUpdateProjectArgs = {
  options: ProjectUpdateInput;
  slug: Scalars['String']['input'];
};

export type MutationUpdateUserDetailsArgs = {
  options: UserUpdateInput;
};

export type MutationUpdateUserRoleArgs = {
  id: Scalars['String']['input'];
  role: Role;
};

export type MutationUpdateUserStatusArgs = {
  id: Scalars['String']['input'];
  status: AccountStatus;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumAccountStatusFilter = {
  equals?: InputMaybe<AccountStatus>;
  in?: InputMaybe<Array<AccountStatus>>;
  not?: InputMaybe<NestedEnumAccountStatusFilter>;
  notIn?: InputMaybe<Array<AccountStatus>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedEnumStatusFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['String']['output'];
  content: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  intro: Scalars['String']['output'];
  readingTime: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  status: Status;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostCreateInput = {
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  intro: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type PostListRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type PostUpdateInput = {
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  intro: Scalars['String']['input'];
  status: Status;
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<JsonFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  intro?: InputMaybe<StringFilter>;
  readingTime?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumStatusFilter>;
  tags?: InputMaybe<StringNullableListFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Project = {
  __typename?: 'Project';
  appStoreUrl?: Maybe<Scalars['String']['output']>;
  authorId: Scalars['String']['output'];
  content: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  githubUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  intro: Scalars['String']['output'];
  playStoreUrl?: Maybe<Scalars['String']['output']>;
  readingTime: Scalars['String']['output'];
  siteUrl?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  status: Status;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectCreateInput = {
  appStoreUrl?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  githubUrl?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  intro: Scalars['String']['input'];
  playStoreUrl?: InputMaybe<Scalars['String']['input']>;
  siteUrl?: InputMaybe<Scalars['String']['input']>;
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ProjectListRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>;
  none?: InputMaybe<ProjectWhereInput>;
  some?: InputMaybe<ProjectWhereInput>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type ProjectUpdateInput = {
  appStoreUrl?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  githubUrl?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  intro: Scalars['String']['input'];
  playStoreUrl?: InputMaybe<Scalars['String']['input']>;
  siteUrl?: InputMaybe<Scalars['String']['input']>;
  status: Status;
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  appStoreUrl?: InputMaybe<StringNullableFilter>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<JsonFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubUrl?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  intro?: InputMaybe<StringFilter>;
  playStoreUrl?: InputMaybe<StringNullableFilter>;
  readingTime?: InputMaybe<StringFilter>;
  siteUrl?: InputMaybe<StringNullableFilter>;
  slug?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumStatusFilter>;
  tags?: InputMaybe<StringNullableListFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns the total number of posts */
  countPosts?: Maybe<CountResponse>;
  countProjects: CountResponse;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  /** Returns all post slugs */
  postSlugs?: Maybe<SlugsResponse>;
  /** Returns all posts */
  posts?: Maybe<Array<Post>>;
  project?: Maybe<Project>;
  /** Returns all project slugs */
  projectSlugs?: Maybe<SlugsResponse>;
  /** Returns all projects */
  projects?: Maybe<Array<Project>>;
  /** Returns the 5 most recent posts */
  recentPosts?: Maybe<Array<Post>>;
  /** Returns the 5 most recent projects */
  recentProjects?: Maybe<Array<Project>>;
  /** Search posts (full text search on title / intro). Content will be added in the future */
  searchPosts?: Maybe<Array<Post>>;
  /** Search projects (full text search on title / intro) */
  searchProjects?: Maybe<Array<Project>>;
  user?: Maybe<User>;
};

export type QueryPostArgs = {
  slug: Scalars['String']['input'];
};

export type QueryProjectArgs = {
  slug: Scalars['String']['input'];
};

export type QuerySearchPostsArgs = {
  query: Scalars['String']['input'];
};

export type QuerySearchProjectsArgs = {
  query: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type SlugsResponse = {
  __typename?: 'SlugsResponse';
  slugs?: Maybe<Array<Scalars['String']['output']>>;
};

export enum Status {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']['input']>>;
  has?: InputMaybe<Scalars['String']['input']>;
  hasEvery?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSome?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  accountStatus: AccountStatus;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  github?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  role: Role;
  twitter?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type UserCount = {
  __typename?: 'UserCount';
  posts: Scalars['Int']['output'];
  projects: Scalars['Int']['output'];
};

export type UserCountPostsArgs = {
  where?: InputMaybe<PostWhereInput>;
};

export type UserCountProjectsArgs = {
  where?: InputMaybe<ProjectWhereInput>;
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserRegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserUpdateInput = {
  github?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accountStatus?: InputMaybe<EnumAccountStatusFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringNullableFilter>;
  emailVerified?: InputMaybe<DateTimeNullableFilter>;
  firstName?: InputMaybe<StringFilter>;
  github?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringFilter>;
  location?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListRelationFilter>;
  projects?: InputMaybe<ProjectListRelationFilter>;
  provider?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  twitter?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringFilter>;
  website?: InputMaybe<StringNullableFilter>;
};

export type PostFragmentFragment = {
  __typename?: 'Post';
  id: string;
  title: string;
  intro: string;
  content: any;
  slug: string;
  tags: Array<string>;
  image?: string | null;
  status: Status;
  createdAt: any;
  updatedAt: any;
};

export type ProjectFragmentFragment = {
  __typename?: 'Project';
  id: string;
  title: string;
  intro: string;
  image?: string | null;
  tags: Array<string>;
  status: Status;
  slug: string;
  siteUrl?: string | null;
  playStoreUrl?: string | null;
  githubUrl?: string | null;
  appStoreUrl?: string | null;
  content: any;
  createdAt: any;
  updatedAt: any;
};

export type UserFragmentFragment = {
  __typename?: 'User';
  id: string;
  firstName: string;
  lastName: string;
  image?: string | null;
  github?: string | null;
  email?: string | null;
  bio?: string | null;
  twitter?: string | null;
  username: string;
  website?: string | null;
  createdAt: any;
  location?: string | null;
};

export type CreatePostMutationVariables = Exact<{
  options: PostCreateInput;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: {
    __typename?: 'PostResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      code?: string | null;
      field: string;
      message: string;
    }> | null;
    post?: {
      __typename?: 'Post';
      id: string;
      title: string;
      intro: string;
      content: any;
      slug: string;
      tags: Array<string>;
      image?: string | null;
      status: Status;
      createdAt: any;
      updatedAt: any;
    } | null;
  };
};

export type CreateProjectMutationVariables = Exact<{
  options: ProjectCreateInput;
}>;

export type CreateProjectMutation = {
  __typename?: 'Mutation';
  createProject: {
    __typename?: 'ProjectResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      message: string;
      field: string;
      code?: string | null;
    }> | null;
    project?: {
      __typename?: 'Project';
      id: string;
      title: string;
      intro: string;
      image?: string | null;
      tags: Array<string>;
      status: Status;
      slug: string;
      siteUrl?: string | null;
      playStoreUrl?: string | null;
      githubUrl?: string | null;
      appStoreUrl?: string | null;
      content: any;
      createdAt: any;
      updatedAt: any;
    } | null;
  };
};

export type DeletePostMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost: boolean;
};

export type DeleteProjectMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type DeleteProjectMutation = {
  __typename?: 'Mutation';
  deleteProject: boolean;
};

export type LoginMutationVariables = Exact<{
  options: UserLoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      message: string;
      field: string;
      code?: string | null;
    }> | null;
    user?: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      image?: string | null;
      github?: string | null;
      email?: string | null;
      bio?: string | null;
      twitter?: string | null;
      username: string;
      website?: string | null;
      createdAt: any;
      location?: string | null;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      message: string;
      field: string;
      code?: string | null;
    }> | null;
    user?: { __typename?: 'User'; id: string } | null;
  };
};

export type UpdateProjectMutationVariables = Exact<{
  options: ProjectUpdateInput;
  slug: Scalars['String']['input'];
}>;

export type UpdateProjectMutation = {
  __typename?: 'Mutation';
  updateProject: {
    __typename?: 'ProjectResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
      code?: string | null;
    }> | null;
    project?: {
      __typename?: 'Project';
      id: string;
      title: string;
      intro: string;
      image?: string | null;
      tags: Array<string>;
      status: Status;
      slug: string;
      siteUrl?: string | null;
      playStoreUrl?: string | null;
      githubUrl?: string | null;
      appStoreUrl?: string | null;
      content: any;
      createdAt: any;
      updatedAt: any;
    } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    image?: string | null;
    github?: string | null;
    email?: string | null;
    bio?: string | null;
    twitter?: string | null;
    username: string;
    website?: string | null;
    createdAt: any;
    location?: string | null;
  } | null;
};

export type PostQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type PostQuery = {
  __typename?: 'Query';
  post?: {
    __typename?: 'Post';
    readingTime: string;
    id: string;
    title: string;
    intro: string;
    content: any;
    slug: string;
    tags: Array<string>;
    image?: string | null;
    status: Status;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type PostSlugsQueryVariables = Exact<{ [key: string]: never }>;

export type PostSlugsQuery = {
  __typename?: 'Query';
  postSlugs?: {
    __typename?: 'SlugsResponse';
    slugs?: Array<string> | null;
  } | null;
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
  __typename?: 'Query';
  posts?: Array<{
    __typename?: 'Post';
    id: string;
    title: string;
    intro: string;
    content: any;
    slug: string;
    tags: Array<string>;
    image?: string | null;
    status: Status;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type ProjectQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type ProjectQuery = {
  __typename?: 'Query';
  project?: {
    __typename?: 'Project';
    id: string;
    title: string;
    intro: string;
    image?: string | null;
    tags: Array<string>;
    status: Status;
    slug: string;
    siteUrl?: string | null;
    playStoreUrl?: string | null;
    githubUrl?: string | null;
    appStoreUrl?: string | null;
    content: any;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type ProjectSlugsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectSlugsQuery = {
  __typename?: 'Query';
  projectSlugs?: {
    __typename?: 'SlugsResponse';
    slugs?: Array<string> | null;
  } | null;
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQuery = {
  __typename?: 'Query';
  projects?: Array<{
    __typename?: 'Project';
    id: string;
    title: string;
    intro: string;
    image?: string | null;
    tags: Array<string>;
    status: Status;
    slug: string;
    siteUrl?: string | null;
    playStoreUrl?: string | null;
    githubUrl?: string | null;
    appStoreUrl?: string | null;
    content: any;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type RecentPostsQueryVariables = Exact<{ [key: string]: never }>;

export type RecentPostsQuery = {
  __typename?: 'Query';
  recentPosts?: Array<{
    __typename?: 'Post';
    id: string;
    title: string;
    intro: string;
    content: any;
    slug: string;
    tags: Array<string>;
    image?: string | null;
    status: Status;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type RecentProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type RecentProjectsQuery = {
  __typename?: 'Query';
  recentProjects?: Array<{
    __typename?: 'Project';
    id: string;
    title: string;
    intro: string;
    image?: string | null;
    tags: Array<string>;
    status: Status;
    slug: string;
    siteUrl?: string | null;
    playStoreUrl?: string | null;
    githubUrl?: string | null;
    appStoreUrl?: string | null;
    content: any;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type SearchPostsQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;

export type SearchPostsQuery = {
  __typename?: 'Query';
  searchPosts?: Array<{
    __typename?: 'Post';
    id: string;
    title: string;
    intro: string;
    content: any;
    slug: string;
    tags: Array<string>;
    image?: string | null;
    status: Status;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type SearchProjectsQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;

export type SearchProjectsQuery = {
  __typename?: 'Query';
  searchProjects?: Array<{
    __typename?: 'Project';
    id: string;
    title: string;
    intro: string;
    image?: string | null;
    tags: Array<string>;
    status: Status;
    slug: string;
    siteUrl?: string | null;
    playStoreUrl?: string | null;
    githubUrl?: string | null;
    appStoreUrl?: string | null;
    content: any;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type UserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type UserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    image?: string | null;
    github?: string | null;
    email?: string | null;
    bio?: string | null;
    twitter?: string | null;
    username: string;
    website?: string | null;
    createdAt: any;
    location?: string | null;
  } | null;
};

export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on Post {
    id
    title
    intro
    content
    slug
    tags
    image
    status
    createdAt
    updatedAt
  }
`;
export const ProjectFragmentFragmentDoc = gql`
  fragment ProjectFragment on Project {
    id
    title
    intro
    image
    tags
    status
    slug
    siteUrl
    playStoreUrl
    githubUrl
    appStoreUrl
    content
    createdAt
    updatedAt
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    image
    github
    email
    bio
    twitter
    username
    website
    createdAt
    location
  }
`;
export const CreatePostDocument = gql`
  mutation CreatePost($options: PostCreateInput!) {
    createPost(options: $options) {
      errors {
        code
        field
        message
      }
      post {
        ...PostFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
  );
}
export const CreateProjectDocument = gql`
  mutation CreateProject($options: ProjectCreateInput!) {
    createProject(options: $options) {
      errors {
        message
        field
        code
      }
      project {
        ...ProjectFragment
      }
    }
  }
  ${ProjectFragmentFragmentDoc}
`;

export function useCreateProjectMutation() {
  return Urql.useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProjectDocument);
}
export const DeletePostDocument = gql`
  mutation DeletePost($slug: String!) {
    deletePost(slug: $slug)
  }
`;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
  );
}
export const DeleteProjectDocument = gql`
  mutation DeleteProject($slug: String!) {
    deleteProject(slug: $slug)
  }
`;

export function useDeleteProjectMutation() {
  return Urql.useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DeleteProjectDocument);
}
export const LoginDocument = gql`
  mutation Login($options: UserLoginInput!) {
    login(options: $options) {
      errors {
        message
        field
        code
      }
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UserRegisterInput!) {
    register(options: $options) {
      errors {
        message
        field
        code
      }
      user {
        id
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
  );
}
export const UpdateProjectDocument = gql`
  mutation UpdateProject($options: ProjectUpdateInput!, $slug: String!) {
    updateProject(options: $options, slug: $slug) {
      errors {
        field
        message
        code
      }
      project {
        ...ProjectFragment
      }
    }
  }
  ${ProjectFragmentFragmentDoc}
`;

export function useUpdateProjectMutation() {
  return Urql.useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UpdateProjectDocument);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
export const PostDocument = gql`
  query Post($slug: String!) {
    post(slug: $slug) {
      ...PostFragment
      readingTime
    }
  }
  ${PostFragmentFragmentDoc}
`;

export function usePostQuery(
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({
    query: PostDocument,
    ...options,
  });
}
export const PostSlugsDocument = gql`
  query PostSlugs {
    postSlugs {
      slugs
    }
  }
`;

export function usePostSlugsQuery(
  options?: Omit<Urql.UseQueryArgs<PostSlugsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PostSlugsQuery, PostSlugsQueryVariables>({
    query: PostSlugsDocument,
    ...options,
  });
}
export const PostsDocument = gql`
  query Posts {
    posts {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;

export function usePostsQuery(
  options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    ...options,
  });
}
export const ProjectDocument = gql`
  query Project($slug: String!) {
    project(slug: $slug) {
      ...ProjectFragment
    }
  }
  ${ProjectFragmentFragmentDoc}
`;

export function useProjectQuery(
  options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ProjectQuery, ProjectQueryVariables>({
    query: ProjectDocument,
    ...options,
  });
}
export const ProjectSlugsDocument = gql`
  query ProjectSlugs {
    projectSlugs {
      slugs
    }
  }
`;

export function useProjectSlugsQuery(
  options?: Omit<Urql.UseQueryArgs<ProjectSlugsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ProjectSlugsQuery, ProjectSlugsQueryVariables>({
    query: ProjectSlugsDocument,
    ...options,
  });
}
export const ProjectsDocument = gql`
  query Projects {
    projects {
      ...ProjectFragment
    }
  }
  ${ProjectFragmentFragmentDoc}
`;

export function useProjectsQuery(
  options?: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ProjectsQuery, ProjectsQueryVariables>({
    query: ProjectsDocument,
    ...options,
  });
}
export const RecentPostsDocument = gql`
  query RecentPosts {
    recentPosts {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;

export function useRecentPostsQuery(
  options?: Omit<Urql.UseQueryArgs<RecentPostsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RecentPostsQuery, RecentPostsQueryVariables>({
    query: RecentPostsDocument,
    ...options,
  });
}
export const RecentProjectsDocument = gql`
  query RecentProjects {
    recentProjects {
      ...ProjectFragment
    }
  }
  ${ProjectFragmentFragmentDoc}
`;

export function useRecentProjectsQuery(
  options?: Omit<Urql.UseQueryArgs<RecentProjectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RecentProjectsQuery, RecentProjectsQueryVariables>({
    query: RecentProjectsDocument,
    ...options,
  });
}
export const SearchPostsDocument = gql`
  query SearchPosts($query: String!) {
    searchPosts(query: $query) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;

export function useSearchPostsQuery(
  options: Omit<Urql.UseQueryArgs<SearchPostsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<SearchPostsQuery, SearchPostsQueryVariables>({
    query: SearchPostsDocument,
    ...options,
  });
}
export const SearchProjectsDocument = gql`
  query SearchProjects($query: String!) {
    searchProjects(query: $query) {
      ...ProjectFragment
    }
  }
  ${ProjectFragmentFragmentDoc}
`;

export function useSearchProjectsQuery(
  options: Omit<Urql.UseQueryArgs<SearchProjectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>({
    query: SearchProjectsDocument,
    ...options,
  });
}
export const UserDocument = gql`
  query User($userId: String!) {
    user(id: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useUserQuery(
  options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({
    query: UserDocument,
    ...options,
  });
}
