import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateNestedOneWithoutContentBlockImageInput } from "../inputs/PostCreateNestedOneWithoutContentBlockImageInput";
import { ProjectCreateNestedOneWithoutContentBlockImageInput } from "../inputs/ProjectCreateNestedOneWithoutContentBlockImageInput";

@TypeGraphQL.InputType("ContentBlockImageCreateInput", {})
export class ContentBlockImageCreateInput {
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

  @TypeGraphQL.Field(_type => PostCreateNestedOneWithoutContentBlockImageInput, {
    nullable: false
  })
  post!: PostCreateNestedOneWithoutContentBlockImageInput;

  @TypeGraphQL.Field(_type => ProjectCreateNestedOneWithoutContentBlockImageInput, {
    nullable: true
  })
  project?: ProjectCreateNestedOneWithoutContentBlockImageInput | undefined;
}
