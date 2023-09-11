import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { JsonFilter } from "../inputs/JsonFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("AdminReportScalarWhereInput", {})
export class AdminReportScalarWhereInput {
  @TypeGraphQL.Field(_type => [AdminReportScalarWhereInput], {
    nullable: true
  })
  AND?: AdminReportScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportScalarWhereInput], {
    nullable: true
  })
  OR?: AdminReportScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AdminReportScalarWhereInput], {
    nullable: true
  })
  NOT?: AdminReportScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  title?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => JsonFilter, {
    nullable: true
  })
  content?: JsonFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  authorId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;
}
