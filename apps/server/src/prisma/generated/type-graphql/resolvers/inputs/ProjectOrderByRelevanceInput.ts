import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectOrderByRelevanceFieldEnum } from "../../enums/ProjectOrderByRelevanceFieldEnum";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ProjectOrderByRelevanceInput", {})
export class ProjectOrderByRelevanceInput {
  @TypeGraphQL.Field(_type => [ProjectOrderByRelevanceFieldEnum], {
    nullable: false
  })
  fields!: Array<"id" | "title" | "slug" | "intro" | "image" | "githubUrl" | "siteUrl" | "appStoreUrl" | "playStoreUrl" | "tags" | "authorId">;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: false
  })
  sort!: "asc" | "desc";

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  search!: string;
}
