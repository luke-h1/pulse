import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCountAggregate } from "../outputs/AdminReportCountAggregate";
import { AdminReportMaxAggregate } from "../outputs/AdminReportMaxAggregate";
import { AdminReportMinAggregate } from "../outputs/AdminReportMinAggregate";

@TypeGraphQL.ObjectType("AggregateAdminReport", {})
export class AggregateAdminReport {
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
