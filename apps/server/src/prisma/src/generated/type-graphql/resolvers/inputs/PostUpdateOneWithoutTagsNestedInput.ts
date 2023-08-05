import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateOrConnectWithoutTagsInput } from "../inputs/PostCreateOrConnectWithoutTagsInput";
import { PostCreateWithoutTagsInput } from "../inputs/PostCreateWithoutTagsInput";
import { PostUpdateToOneWithWhereWithoutTagsInput } from "../inputs/PostUpdateToOneWithWhereWithoutTagsInput";
import { PostUpsertWithoutTagsInput } from "../inputs/PostUpsertWithoutTagsInput";
import { PostWhereInput } from "../inputs/PostWhereInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostUpdateOneWithoutTagsNestedInput", {})
export class PostUpdateOneWithoutTagsNestedInput {
  @TypeGraphQL.Field(_type => PostCreateWithoutTagsInput, {
    nullable: true
  })
  create?: PostCreateWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => PostCreateOrConnectWithoutTagsInput, {
    nullable: true
  })
  connectOrCreate?: PostCreateOrConnectWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => PostUpsertWithoutTagsInput, {
    nullable: true
  })
  upsert?: PostUpsertWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => PostWhereInput, {
    nullable: true
  })
  disconnect?: PostWhereInput | undefined;

  @TypeGraphQL.Field(_type => PostWhereInput, {
    nullable: true
  })
  delete?: PostWhereInput | undefined;

  @TypeGraphQL.Field(_type => PostWhereUniqueInput, {
    nullable: true
  })
  connect?: PostWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => PostUpdateToOneWithWhereWithoutTagsInput, {
    nullable: true
  })
  update?: PostUpdateToOneWithWhereWithoutTagsInput | undefined;
}
