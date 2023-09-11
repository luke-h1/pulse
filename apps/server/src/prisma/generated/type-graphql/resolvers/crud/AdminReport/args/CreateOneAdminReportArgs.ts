import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportCreateInput } from "../../../inputs/AdminReportCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneAdminReportArgs {
  @TypeGraphQL.Field(_type => AdminReportCreateInput, {
    nullable: false
  })
  data!: AdminReportCreateInput;
}
