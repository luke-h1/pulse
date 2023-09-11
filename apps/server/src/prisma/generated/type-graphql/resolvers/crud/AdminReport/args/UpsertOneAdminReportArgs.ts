import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportCreateInput } from "../../../inputs/AdminReportCreateInput";
import { AdminReportUpdateInput } from "../../../inputs/AdminReportUpdateInput";
import { AdminReportWhereUniqueInput } from "../../../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneAdminReportArgs {
  @TypeGraphQL.Field(_type => AdminReportWhereUniqueInput, {
    nullable: false
  })
  where!: AdminReportWhereUniqueInput;

  @TypeGraphQL.Field(_type => AdminReportCreateInput, {
    nullable: false
  })
  create!: AdminReportCreateInput;

  @TypeGraphQL.Field(_type => AdminReportUpdateInput, {
    nullable: false
  })
  update!: AdminReportUpdateInput;
}
