import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumAccountStatusFilter } from "../inputs/NestedEnumAccountStatusFilter";
import { AccountStatus } from "../../enums/AccountStatus";

@TypeGraphQL.InputType("EnumAccountStatusFilter", {})
export class EnumAccountStatusFilter {
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

  @TypeGraphQL.Field(_type => NestedEnumAccountStatusFilter, {
    nullable: true
  })
  not?: NestedEnumAccountStatusFilter | undefined;
}
