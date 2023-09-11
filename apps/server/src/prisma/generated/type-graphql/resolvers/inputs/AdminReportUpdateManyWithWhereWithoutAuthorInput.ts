import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportScalarWhereInput } from "../inputs/AdminReportScalarWhereInput";
import { AdminReportUpdateManyMutationInput } from "../inputs/AdminReportUpdateManyMutationInput";

@TypeGraphQL.InputType("AdminReportUpdateManyWithWhereWithoutAuthorInput", {})
export class AdminReportUpdateManyWithWhereWithoutAuthorInput {
  @TypeGraphQL.Field(_type => AdminReportScalarWhereInput, {
    nullable: false
  })
  where!: AdminReportScalarWhereInput;

  @TypeGraphQL.Field(_type => AdminReportUpdateManyMutationInput, {
    nullable: false
  })
  data!: AdminReportUpdateManyMutationInput;
}
