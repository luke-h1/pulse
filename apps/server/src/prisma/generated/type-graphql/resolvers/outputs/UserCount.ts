import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCountPostsArgs } from "./args/UserCountPostsArgs";
import { UserCountProjectsArgs } from "./args/UserCountProjectsArgs";
import { UserCountReportsArgs } from "./args/UserCountReportsArgs";

@TypeGraphQL.ObjectType("UserCount", {})
export class UserCount {
  projects!: number;
  posts!: number;
  reports!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    name: "projects",
    nullable: false
  })
  getProjects(@TypeGraphQL.Root() root: UserCount, @TypeGraphQL.Args() args: UserCountProjectsArgs): number {
    return root.projects;
  }

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    name: "posts",
    nullable: false
  })
  getPosts(@TypeGraphQL.Root() root: UserCount, @TypeGraphQL.Args() args: UserCountPostsArgs): number {
    return root.posts;
  }

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    name: "reports",
    nullable: false
  })
  getReports(@TypeGraphQL.Root() root: UserCount, @TypeGraphQL.Args() args: UserCountReportsArgs): number {
    return root.reports;
  }
}
