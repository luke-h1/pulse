import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateNestedOneWithoutTagsInput } from "../inputs/PostCreateNestedOneWithoutTagsInput";
import { ProjectCreateNestedOneWithoutTagsInput } from "../inputs/ProjectCreateNestedOneWithoutTagsInput";

@TypeGraphQL.InputType("TagCreateInput", {})
export class TagCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  slug!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => PostCreateNestedOneWithoutTagsInput, {
    nullable: true
  })
  post?: PostCreateNestedOneWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateNestedOneWithoutTagsInput, {
    nullable: true
  })
  project?: ProjectCreateNestedOneWithoutTagsInput | undefined;
}
