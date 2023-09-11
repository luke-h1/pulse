import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportUpdateWithoutAuthorInput } from "../inputs/AdminReportUpdateWithoutAuthorInput";
import { AdminReportWhereUniqueInput } from "../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.InputType("AdminReportUpdateWithWhereUniqueWithoutAuthorInput", {})
export class AdminReportUpdateWithWhereUniqueWithoutAuthorInput {
  @TypeGraphQL.Field(_type => AdminReportWhereUniqueInput, {
    nullable: false
  })
  where!: AdminReportWhereUniqueInput;

  @TypeGraphQL.Field(_type => AdminReportUpdateWithoutAuthorInput, {
    nullable: false
  })
  data!: AdminReportUpdateWithoutAuthorInput;
}
