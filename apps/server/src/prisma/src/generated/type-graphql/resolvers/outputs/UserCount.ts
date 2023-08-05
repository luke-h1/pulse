import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { UserCountPostsArgs } from "./args/UserCountPostsArgs";
import { UserCountProjectsArgs } from "./args/UserCountProjectsArgs";

@TypeGraphQL.ObjectType("UserCount", {})
export class UserCount {
  projects!: number;
  posts!: number;

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
}
