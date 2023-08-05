import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateManyPostInput } from "../inputs/TagCreateManyPostInput";

@TypeGraphQL.InputType("TagCreateManyPostInputEnvelope", {})
export class TagCreateManyPostInputEnvelope {
  @TypeGraphQL.Field(_type => [TagCreateManyPostInput], {
    nullable: false
  })
  data!: TagCreateManyPostInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
