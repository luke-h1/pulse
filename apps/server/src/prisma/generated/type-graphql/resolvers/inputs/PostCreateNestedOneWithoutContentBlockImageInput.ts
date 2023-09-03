import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateOrConnectWithoutContentBlockImageInput } from "../inputs/PostCreateOrConnectWithoutContentBlockImageInput";
import { PostCreateWithoutContentBlockImageInput } from "../inputs/PostCreateWithoutContentBlockImageInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostCreateNestedOneWithoutContentBlockImageInput", {})
export class PostCreateNestedOneWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => PostCreateWithoutContentBlockImageInput, {
    nullable: true
  })
  create?: PostCreateWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => PostCreateOrConnectWithoutContentBlockImageInput, {
    nullable: true
  })
  connectOrCreate?: PostCreateOrConnectWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => PostWhereUniqueInput, {
    nullable: true
  })
  connect?: PostWhereUniqueInput | undefined;
}
