import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCreateManyAuthorInputEnvelope } from "../inputs/AdminReportCreateManyAuthorInputEnvelope";
import { AdminReportCreateOrConnectWithoutAuthorInput } from "../inputs/AdminReportCreateOrConnectWithoutAuthorInput";
import { AdminReportCreateWithoutAuthorInput } from "../inputs/AdminReportCreateWithoutAuthorInput";
import { AdminReportWhereUniqueInput } from "../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.InputType("AdminReportCreateNestedManyWithoutAuthorInput", {})
export class AdminReportCreateNestedManyWithoutAuthorInput {
  @TypeGraphQL.Field(_type => [AdminReportCreateWithoutAuthorInput], {
    nullable: true
  })
  create?: AdminReportCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportCreateOrConnectWithoutAuthorInput], {
    nullable: true
  })
  connectOrCreate?: AdminReportCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => AdminReportCreateManyAuthorInputEnvelope, {
    nullable: true
  })
  createMany?: AdminReportCreateManyAuthorInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [AdminReportWhereUniqueInput], {
    nullable: true
  })
  connect?: AdminReportWhereUniqueInput[] | undefined;
}
