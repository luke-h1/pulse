import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCountContentBlockImageArgs } from "./args/PostCountContentBlockImageArgs";

@TypeGraphQL.ObjectType("PostCount", {})
export class PostCount {
  ContentBlockImage!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    name: "ContentBlockImage",
    nullable: false
  })
  getContentBlockImage(@TypeGraphQL.Root() root: PostCount, @TypeGraphQL.Args() args: PostCountContentBlockImageArgs): number {
    return root.ContentBlockImage;
  }
}
