import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportWhereUniqueInput } from "../../../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueAdminReportArgs {
  @TypeGraphQL.Field(_type => AdminReportWhereUniqueInput, {
    nullable: false
  })
  where!: AdminReportWhereUniqueInput;
}
