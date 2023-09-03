import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageScalarWhereInput } from "../inputs/ContentBlockImageScalarWhereInput";
import { ContentBlockImageUpdateManyMutationInput } from "../inputs/ContentBlockImageUpdateManyMutationInput";

@TypeGraphQL.InputType("ContentBlockImageUpdateManyWithWhereWithoutProjectInput", {})
export class ContentBlockImageUpdateManyWithWhereWithoutProjectInput {
  @TypeGraphQL.Field(_type => ContentBlockImageScalarWhereInput, {
    nullable: false
  })
  where!: ContentBlockImageScalarWhereInput;

  @TypeGraphQL.Field(_type => ContentBlockImageUpdateManyMutationInput, {
    nullable: false
  })
  data!: ContentBlockImageUpdateManyMutationInput;
}
