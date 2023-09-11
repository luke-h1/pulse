import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCreateManyAuthorInputEnvelope } from "../inputs/AdminReportCreateManyAuthorInputEnvelope";
import { AdminReportCreateOrConnectWithoutAuthorInput } from "../inputs/AdminReportCreateOrConnectWithoutAuthorInput";
import { AdminReportCreateWithoutAuthorInput } from "../inputs/AdminReportCreateWithoutAuthorInput";
import { AdminReportScalarWhereInput } from "../inputs/AdminReportScalarWhereInput";
import { AdminReportUpdateManyWithWhereWithoutAuthorInput } from "../inputs/AdminReportUpdateManyWithWhereWithoutAuthorInput";
import { AdminReportUpdateWithWhereUniqueWithoutAuthorInput } from "../inputs/AdminReportUpdateWithWhereUniqueWithoutAuthorInput";
import { AdminReportUpsertWithWhereUniqueWithoutAuthorInput } from "../inputs/AdminReportUpsertWithWhereUniqueWithoutAuthorInput";
import { AdminReportWhereUniqueInput } from "../inputs/AdminReportWhereUniqueInput";

@TypeGraphQL.InputType("AdminReportUpdateManyWithoutAuthorNestedInput", {})
export class AdminReportUpdateManyWithoutAuthorNestedInput {
  @TypeGraphQL.Field(_type => [AdminReportCreateWithoutAuthorInput], {
    nullable: true
  })
  create?: AdminReportCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportCreateOrConnectWithoutAuthorInput], {
    nullable: true
  })
  connectOrCreate?: AdminReportCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportUpsertWithWhereUniqueWithoutAuthorInput], {
    nullable: true
  })
  upsert?: AdminReportUpsertWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => AdminReportCreateManyAuthorInputEnvelope, {
    nullable: true
  })
  createMany?: AdminReportCreateManyAuthorInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [AdminReportWhereUniqueInput], {
    nullable: true
  })
  set?: AdminReportWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportWhereUniqueInput], {
    nullable: true
  })
  disconnect?: AdminReportWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportWhereUniqueInput], {
    nullable: true
  })
  delete?: AdminReportWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportWhereUniqueInput], {
    nullable: true
  })
  connect?: AdminReportWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportUpdateWithWhereUniqueWithoutAuthorInput], {
    nullable: true
  })
  update?: AdminReportUpdateWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportUpdateManyWithWhereWithoutAuthorInput], {
    nullable: true
  })
  updateMany?: AdminReportUpdateManyWithWhereWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportScalarWhereInput], {
    nullable: true
  })
  deleteMany?: AdminReportScalarWhereInput[] | undefined;
}
