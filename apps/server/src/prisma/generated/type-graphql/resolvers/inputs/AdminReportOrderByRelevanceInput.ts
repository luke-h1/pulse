import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportOrderByRelevanceFieldEnum } from "../../enums/AdminReportOrderByRelevanceFieldEnum";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("AdminReportOrderByRelevanceInput", {})
export class AdminReportOrderByRelevanceInput {
  @TypeGraphQL.Field(_type => [AdminReportOrderByRelevanceFieldEnum], {
    nullable: false
  })
  fields!: Array<"id" | "title" | "authorId">;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: false
  })
  sort!: "asc" | "desc";

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  search!: string;
}
