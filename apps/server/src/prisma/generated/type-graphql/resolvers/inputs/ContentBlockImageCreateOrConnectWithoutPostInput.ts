import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateWithoutPostInput } from "../inputs/ContentBlockImageCreateWithoutPostInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageCreateOrConnectWithoutPostInput", {})
export class ContentBlockImageCreateOrConnectWithoutPostInput {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: false
  })
  where!: ContentBlockImageWhereUniqueInput;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateWithoutPostInput, {
    nullable: false
  })
  create!: ContentBlockImageCreateWithoutPostInput;
}
