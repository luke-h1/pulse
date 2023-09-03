import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateOrConnectWithoutContentBlockImageInput } from "../inputs/PostCreateOrConnectWithoutContentBlockImageInput";
import { PostCreateWithoutContentBlockImageInput } from "../inputs/PostCreateWithoutContentBlockImageInput";
import { PostUpdateToOneWithWhereWithoutContentBlockImageInput } from "../inputs/PostUpdateToOneWithWhereWithoutContentBlockImageInput";
import { PostUpsertWithoutContentBlockImageInput } from "../inputs/PostUpsertWithoutContentBlockImageInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostUpdateOneRequiredWithoutContentBlockImageNestedInput", {})
export class PostUpdateOneRequiredWithoutContentBlockImageNestedInput {
  @TypeGraphQL.Field(_type => PostCreateWithoutContentBlockImageInput, {
    nullable: true
  })
  create?: PostCreateWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => PostCreateOrConnectWithoutContentBlockImageInput, {
    nullable: true
  })
  connectOrCreate?: PostCreateOrConnectWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => PostUpsertWithoutContentBlockImageInput, {
    nullable: true
  })
  upsert?: PostUpsertWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => PostWhereUniqueInput, {
    nullable: true
  })
  connect?: PostWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => PostUpdateToOneWithWhereWithoutContentBlockImageInput, {
    nullable: true
  })
  update?: PostUpdateToOneWithWhereWithoutContentBlockImageInput | undefined;
}
