import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCountAggregate } from "../outputs/ContentBlockImageCountAggregate";
import { ContentBlockImageMaxAggregate } from "../outputs/ContentBlockImageMaxAggregate";
import { ContentBlockImageMinAggregate } from "../outputs/ContentBlockImageMinAggregate";

@TypeGraphQL.ObjectType("AggregateContentBlockImage", {})
export class AggregateContentBlockImage {
  @TypeGraphQL.Field(_type => ContentBlockImageCountAggregate, {
    nullable: true
  })
  _count!: ContentBlockImageCountAggregate | null;

  @TypeGraphQL.Field(_type => ContentBlockImageMinAggregate, {
    nullable: true
  })
  _min!: ContentBlockImageMinAggregate | null;

  @TypeGraphQL.Field(_type => ContentBlockImageMaxAggregate, {
    nullable: true
  })
  _max!: ContentBlockImageMaxAggregate | null;
}
