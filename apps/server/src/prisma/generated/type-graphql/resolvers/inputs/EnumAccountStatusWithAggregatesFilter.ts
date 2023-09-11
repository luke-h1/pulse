import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumAccountStatusFilter } from "../inputs/NestedEnumAccountStatusFilter";
import { NestedEnumAccountStatusWithAggregatesFilter } from "../inputs/NestedEnumAccountStatusWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { AccountStatus } from "../../enums/AccountStatus";

@TypeGraphQL.InputType("EnumAccountStatusWithAggregatesFilter", {})
export class EnumAccountStatusWithAggregatesFilter {
  @TypeGraphQL.Field(_type => AccountStatus, {
    nullable: true
  })
  equals?: "BANNED" | "ON_HOLD" | "ACTIVE" | undefined;

  @TypeGraphQL.Field(_type => [AccountStatus], {
    nullable: true
  })
  in?: Array<"BANNED" | "ON_HOLD" | "ACTIVE"> | undefined;

  @TypeGraphQL.Field(_type => [AccountStatus], {
    nullable: true
  })
  notIn?: Array<"BANNED" | "ON_HOLD" | "ACTIVE"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumAccountStatusWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumAccountStatusWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumAccountStatusFilter, {
    nullable: true
  })
  _min?: NestedEnumAccountStatusFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumAccountStatusFilter, {
    nullable: true
  })
  _max?: NestedEnumAccountStatusFilter | undefined;
}
