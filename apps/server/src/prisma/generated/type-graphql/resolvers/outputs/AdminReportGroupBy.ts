import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCountAggregate } from "../outputs/AdminReportCountAggregate";
import { AdminReportMaxAggregate } from "../outputs/AdminReportMaxAggregate";
import { AdminReportMinAggregate } from "../outputs/AdminReportMinAggregate";

@TypeGraphQL.ObjectType("AdminReportGroupBy", {})
export class AdminReportGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: false
  })
  content!: Prisma.JsonValue;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  authorId!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => AdminReportCountAggregate, {
    nullable: true
  })
  _count!: AdminReportCountAggregate | null;

  @TypeGraphQL.Field(_type => AdminReportMinAggregate, {
    nullable: true
  })
  _min!: AdminReportMinAggregate | null;

  @TypeGraphQL.Field(_type => AdminReportMaxAggregate, {
    nullable: true
  })
  _max!: AdminReportMaxAggregate | null;
}
