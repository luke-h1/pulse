import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumStatusFilter } from "../inputs/NestedEnumStatusFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { Status } from "../../enums/Status";

@TypeGraphQL.InputType("NestedEnumStatusWithAggregatesFilter", {})
export class NestedEnumStatusWithAggregatesFilter {
  @TypeGraphQL.Field(_type => Status, {
    nullable: true
  })
  equals?: "PUBLISHED" | "DRAFT" | undefined;

  @TypeGraphQL.Field(_type => [Status], {
    nullable: true
  })
  in?: Array<"PUBLISHED" | "DRAFT"> | undefined;

  @TypeGraphQL.Field(_type => [Status], {
    nullable: true
  })
  notIn?: Array<"PUBLISHED" | "DRAFT"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumStatusWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumStatusWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumStatusFilter, {
    nullable: true
  })
  _min?: NestedEnumStatusFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumStatusFilter, {
    nullable: true
  })
  _max?: NestedEnumStatusFilter | undefined;
}
