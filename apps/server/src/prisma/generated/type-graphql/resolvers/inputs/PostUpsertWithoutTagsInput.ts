import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateWithoutTagsInput } from "../inputs/PostCreateWithoutTagsInput";
import { PostUpdateWithoutTagsInput } from "../inputs/PostUpdateWithoutTagsInput";
import { PostWhereInput } from "../inputs/PostWhereInput";

@TypeGraphQL.InputType("PostUpsertWithoutTagsInput", {})
export class PostUpsertWithoutTagsInput {
  @TypeGraphQL.Field(_type => PostUpdateWithoutTagsInput, {
    nullable: false
  })
  update!: PostUpdateWithoutTagsInput;

  @TypeGraphQL.Field(_type => PostCreateWithoutTagsInput, {
    nullable: false
  })
  create!: PostCreateWithoutTagsInput;

  @TypeGraphQL.Field(_type => PostWhereInput, {
    nullable: true
  })
  where?: PostWhereInput | undefined;
}
