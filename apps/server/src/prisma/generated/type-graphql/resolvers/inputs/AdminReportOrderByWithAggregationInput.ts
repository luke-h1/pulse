import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCountOrderByAggregateInput } from "../inputs/AdminReportCountOrderByAggregateInput";
import { AdminReportMaxOrderByAggregateInput } from "../inputs/AdminReportMaxOrderByAggregateInput";
import { AdminReportMinOrderByAggregateInput } from "../inputs/AdminReportMinOrderByAggregateInput";
import { SortOrderInput } from "../inputs/SortOrderInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("AdminReportOrderByWithAggregationInput", {})
export class AdminReportOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  title?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  content?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  authorId?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => AdminReportCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: AdminReportCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AdminReportMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: AdminReportMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AdminReportMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: AdminReportMinOrderByAggregateInput | undefined;
}
