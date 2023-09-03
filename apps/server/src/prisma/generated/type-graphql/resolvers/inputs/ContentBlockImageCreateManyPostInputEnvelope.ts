import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateManyPostInput } from "../inputs/ContentBlockImageCreateManyPostInput";

@TypeGraphQL.InputType("ContentBlockImageCreateManyPostInputEnvelope", {})
export class ContentBlockImageCreateManyPostInputEnvelope {
  @TypeGraphQL.Field(_type => [ContentBlockImageCreateManyPostInput], {
    nullable: false
  })
  data!: ContentBlockImageCreateManyPostInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
