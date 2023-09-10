import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { Post } from '../models/Post';
import { Project } from '../models/Project';
import { AccountStatus } from '../enums/AccountStatus';
import { Role } from '../enums/Role';
import { UserCount } from '../resolvers/outputs/UserCount';

@TypeGraphQL.ObjectType('User', {})
export class User {
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
  })
  provider!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
  })
  firstName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
  })
  lastName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  email?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
  })
  username!: string;

  password?: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  image?: string | null;

  @TypeGraphQL.Field(_type => Role, {
    nullable: false,
  })
  role!: 'USER' | 'ADMIN';

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  github?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  website?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  twitter?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  bio?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  location?: string | null;

  @TypeGraphQL.Field(_type => AccountStatus, {
    nullable: false,
  })
  accountStatus!: 'BANNED' | 'ON_HOLD' | 'ACTIVE';

  projects?: Project[];

  posts?: Post[];

  @TypeGraphQL.Field(_type => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false,
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => UserCount, {
    nullable: true,
  })
  _count?: UserCount | null;
}
