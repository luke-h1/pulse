import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateManyProjectInput } from "../inputs/TagCreateManyProjectInput";

@TypeGraphQL.InputType("TagCreateManyProjectInputEnvelope", {})
export class TagCreateManyProjectInputEnvelope {
  @TypeGraphQL.Field(_type => [TagCreateManyProjectInput], {
    nullable: false
  })
  data!: TagCreateManyProjectInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
