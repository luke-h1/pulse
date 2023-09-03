import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostUpdateWithoutContentBlockImageInput } from "../inputs/PostUpdateWithoutContentBlockImageInput";
import { PostWhereInput } from "../inputs/PostWhereInput";

@TypeGraphQL.InputType("PostUpdateToOneWithWhereWithoutContentBlockImageInput", {})
export class PostUpdateToOneWithWhereWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => PostWhereInput, {
    nullable: true
  })
  where?: PostWhereInput | undefined;

  @TypeGraphQL.Field(_type => PostUpdateWithoutContentBlockImageInput, {
    nullable: false
  })
  data!: PostUpdateWithoutContentBlockImageInput;
}
