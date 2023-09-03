import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageUpdateWithoutPostInput } from "../inputs/ContentBlockImageUpdateWithoutPostInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageUpdateWithWhereUniqueWithoutPostInput", {})
export class ContentBlockImageUpdateWithWhereUniqueWithoutPostInput {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: false
  })
  where!: ContentBlockImageWhereUniqueInput;

  @TypeGraphQL.Field(_type => ContentBlockImageUpdateWithoutPostInput, {
    nullable: false
  })
  data!: ContentBlockImageUpdateWithoutPostInput;
}
