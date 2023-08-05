import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCountTagsArgs } from "./args/ProjectCountTagsArgs";

@TypeGraphQL.ObjectType("ProjectCount", {})
export class ProjectCount {
  tags!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    name: "tags",
    nullable: false
  })
  getTags(@TypeGraphQL.Root() root: ProjectCount, @TypeGraphQL.Args() args: ProjectCountTagsArgs): number {
    return root.tags;
  }
}
