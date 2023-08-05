import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { PostCountTagsArgs } from "./args/PostCountTagsArgs";

@TypeGraphQL.ObjectType("PostCount", {})
export class PostCount {
  tags!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    name: "tags",
    nullable: false
  })
  getTags(@TypeGraphQL.Root() root: PostCount, @TypeGraphQL.Args() args: PostCountTagsArgs): number {
    return root.tags;
  }
}
