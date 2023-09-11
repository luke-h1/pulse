import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportWhereInput } from "../inputs/AdminReportWhereInput";

@TypeGraphQL.InputType("AdminReportListRelationFilter", {})
export class AdminReportListRelationFilter {
  @TypeGraphQL.Field(_type => AdminReportWhereInput, {
    nullable: true
  })
  every?: AdminReportWhereInput | undefined;

  @TypeGraphQL.Field(_type => AdminReportWhereInput, {
    nullable: true
  })
  some?: AdminReportWhereInput | undefined;

  @TypeGraphQL.Field(_type => AdminReportWhereInput, {
    nullable: true
  })
  none?: AdminReportWhereInput | undefined;
}
