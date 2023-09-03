import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateManyProjectInput } from "../inputs/ContentBlockImageCreateManyProjectInput";

@TypeGraphQL.InputType("ContentBlockImageCreateManyProjectInputEnvelope", {})
export class ContentBlockImageCreateManyProjectInputEnvelope {
  @TypeGraphQL.Field(_type => [ContentBlockImageCreateManyProjectInput], {
    nullable: false
  })
  data!: ContentBlockImageCreateManyProjectInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
