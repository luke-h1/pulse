import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateWithoutProjectInput } from "../inputs/ContentBlockImageCreateWithoutProjectInput";
import { ContentBlockImageUpdateWithoutProjectInput } from "../inputs/ContentBlockImageUpdateWithoutProjectInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageUpsertWithWhereUniqueWithoutProjectInput", {})
export class ContentBlockImageUpsertWithWhereUniqueWithoutProjectInput {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: false
  })
  where!: ContentBlockImageWhereUniqueInput;

  @TypeGraphQL.Field(_type => ContentBlockImageUpdateWithoutProjectInput, {
    nullable: false
  })
  update!: ContentBlockImageUpdateWithoutProjectInput;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateWithoutProjectInput, {
    nullable: false
  })
  create!: ContentBlockImageCreateWithoutProjectInput;
}
