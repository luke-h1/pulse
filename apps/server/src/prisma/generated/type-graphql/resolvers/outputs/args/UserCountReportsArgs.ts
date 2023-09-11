import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportWhereInput } from "../../inputs/AdminReportWhereInput";

@TypeGraphQL.ArgsType()
export class UserCountReportsArgs {
  @TypeGraphQL.Field(_type => AdminReportWhereInput, {
    nullable: true
  })
  where?: AdminReportWhereInput | undefined;
}
