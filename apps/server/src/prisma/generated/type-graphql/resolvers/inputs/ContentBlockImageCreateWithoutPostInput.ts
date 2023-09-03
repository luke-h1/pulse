import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateNestedOneWithoutContentBlockImageInput } from "../inputs/ProjectCreateNestedOneWithoutContentBlockImageInput";

@TypeGraphQL.InputType("ContentBlockImageCreateWithoutPostInput", {})
export class ContentBlockImageCreateWithoutPostInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  imageFilename?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateNestedOneWithoutContentBlockImageInput, {
    nullable: true
  })
  project?: ProjectCreateNestedOneWithoutContentBlockImageInput | undefined;
}
