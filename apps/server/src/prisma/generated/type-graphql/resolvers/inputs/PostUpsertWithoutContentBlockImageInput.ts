import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateWithoutContentBlockImageInput } from "../inputs/PostCreateWithoutContentBlockImageInput";
import { PostUpdateWithoutContentBlockImageInput } from "../inputs/PostUpdateWithoutContentBlockImageInput";
import { PostWhereInput } from "../inputs/PostWhereInput";

@TypeGraphQL.InputType("PostUpsertWithoutContentBlockImageInput", {})
export class PostUpsertWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => PostUpdateWithoutContentBlockImageInput, {
    nullable: false
  })
  update!: PostUpdateWithoutContentBlockImageInput;

  @TypeGraphQL.Field(_type => PostCreateWithoutContentBlockImageInput, {
    nullable: false
  })
  create!: PostCreateWithoutContentBlockImageInput;

  @TypeGraphQL.Field(_type => PostWhereInput, {
    nullable: true
  })
  where?: PostWhereInput | undefined;
}
