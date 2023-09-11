import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportUpdateManyMutationInput } from "../../../inputs/AdminReportUpdateManyMutationInput";
import { AdminReportWhereInput } from "../../../inputs/AdminReportWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyAdminReportArgs {
  @TypeGraphQL.Field(_type => AdminReportUpdateManyMutationInput, {
    nullable: false
  })
  data!: AdminReportUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => AdminReportWhereInput, {
    nullable: true
  })
  where?: AdminReportWhereInput | undefined;
}
