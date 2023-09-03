import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCountContentBlockImageArgs } from "./args/ProjectCountContentBlockImageArgs";

@TypeGraphQL.ObjectType("ProjectCount", {})
export class ProjectCount {
  ContentBlockImage!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    name: "ContentBlockImage",
    nullable: false
  })
  getContentBlockImage(@TypeGraphQL.Root() root: ProjectCount, @TypeGraphQL.Args() args: ProjectCountContentBlockImageArgs): number {
    return root.ContentBlockImage;
  }
}
