import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageUpdateWithoutProjectInput } from "../inputs/ContentBlockImageUpdateWithoutProjectInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageUpdateWithWhereUniqueWithoutProjectInput", {})
export class ContentBlockImageUpdateWithWhereUniqueWithoutProjectInput {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: false
  })
  where!: ContentBlockImageWhereUniqueInput;

  @TypeGraphQL.Field(_type => ContentBlockImageUpdateWithoutProjectInput, {
    nullable: false
  })
  data!: ContentBlockImageUpdateWithoutProjectInput;
}
