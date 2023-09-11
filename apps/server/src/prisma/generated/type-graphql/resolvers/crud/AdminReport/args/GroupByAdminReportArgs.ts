import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportOrderByWithAggregationInput } from "../../../inputs/AdminReportOrderByWithAggregationInput";
import { AdminReportScalarWhereWithAggregatesInput } from "../../../inputs/AdminReportScalarWhereWithAggregatesInput";
import { AdminReportWhereInput } from "../../../inputs/AdminReportWhereInput";
import { AdminReportScalarFieldEnum } from "../../../../enums/AdminReportScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByAdminReportArgs {
  @TypeGraphQL.Field(_type => AdminReportWhereInput, {
    nullable: true
  })
  where?: AdminReportWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AdminReportOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: AdminReportOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "title" | "content" | "authorId" | "createdAt" | "updatedAt">;

  @TypeGraphQL.Field(_type => AdminReportScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: AdminReportScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
