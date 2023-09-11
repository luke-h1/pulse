import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportUpdateInput } from "../../../inputs/AdminReportUpdateInput";
import { AdminReportWhereUniqueInput } from "../../../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneAdminReportArgs {
  @TypeGraphQL.Field(_type => AdminReportUpdateInput, {
    nullable: false
  })
  data!: AdminReportUpdateInput;

  @TypeGraphQL.Field(_type => AdminReportWhereUniqueInput, {
    nullable: false
  })
  where!: AdminReportWhereUniqueInput;
}
