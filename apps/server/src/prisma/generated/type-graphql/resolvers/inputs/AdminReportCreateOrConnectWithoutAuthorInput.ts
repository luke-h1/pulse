import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCreateWithoutAuthorInput } from "../inputs/AdminReportCreateWithoutAuthorInput";
import { AdminReportWhereUniqueInput } from "../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.InputType("AdminReportCreateOrConnectWithoutAuthorInput", {})
export class AdminReportCreateOrConnectWithoutAuthorInput {
  @TypeGraphQL.Field(_type => AdminReportWhereUniqueInput, {
    nullable: false
  })
  where!: AdminReportWhereUniqueInput;

  @TypeGraphQL.Field(_type => AdminReportCreateWithoutAuthorInput, {
    nullable: false
  })
  create!: AdminReportCreateWithoutAuthorInput;
}
