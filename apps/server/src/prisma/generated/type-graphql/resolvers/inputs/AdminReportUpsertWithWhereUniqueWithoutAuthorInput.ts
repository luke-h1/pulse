import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCreateWithoutAuthorInput } from "../inputs/AdminReportCreateWithoutAuthorInput";
import { AdminReportUpdateWithoutAuthorInput } from "../inputs/AdminReportUpdateWithoutAuthorInput";
import { AdminReportWhereUniqueInput } from "../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.InputType("AdminReportUpsertWithWhereUniqueWithoutAuthorInput", {})
export class AdminReportUpsertWithWhereUniqueWithoutAuthorInput {
  @TypeGraphQL.Field(_type => AdminReportWhereUniqueInput, {
    nullable: false
  })
  where!: AdminReportWhereUniqueInput;

  @TypeGraphQL.Field(_type => AdminReportUpdateWithoutAuthorInput, {
    nullable: false
  })
  update!: AdminReportUpdateWithoutAuthorInput;

  @TypeGraphQL.Field(_type => AdminReportCreateWithoutAuthorInput, {
    nullable: false
  })
  create!: AdminReportCreateWithoutAuthorInput;
}
