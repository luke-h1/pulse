import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageOrderByRelevanceFieldEnum } from "../../enums/ContentBlockImageOrderByRelevanceFieldEnum";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ContentBlockImageOrderByRelevanceInput", {})
export class ContentBlockImageOrderByRelevanceInput {
  @TypeGraphQL.Field(_type => [ContentBlockImageOrderByRelevanceFieldEnum], {
    nullable: false
  })
  fields!: Array<"id" | "image" | "imageFilename" | "postId" | "projectId">;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: false
  })
  sort!: "asc" | "desc";

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  search!: string;
}
