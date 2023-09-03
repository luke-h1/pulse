import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateWithoutContentBlockImageInput } from "../inputs/PostCreateWithoutContentBlockImageInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostCreateOrConnectWithoutContentBlockImageInput", {})
export class PostCreateOrConnectWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => PostWhereUniqueInput, {
    nullable: false
  })
  where!: PostWhereUniqueInput;

  @TypeGraphQL.Field(_type => PostCreateWithoutContentBlockImageInput, {
    nullable: false
  })
  create!: PostCreateWithoutContentBlockImageInput;
}
