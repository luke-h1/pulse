import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateManyPostInputEnvelope } from "../inputs/ContentBlockImageCreateManyPostInputEnvelope";
import { ContentBlockImageCreateOrConnectWithoutPostInput } from "../inputs/ContentBlockImageCreateOrConnectWithoutPostInput";
import { ContentBlockImageCreateWithoutPostInput } from "../inputs/ContentBlockImageCreateWithoutPostInput";
import { ContentBlockImageScalarWhereInput } from "../inputs/ContentBlockImageScalarWhereInput";
import { ContentBlockImageUpdateManyWithWhereWithoutPostInput } from "../inputs/ContentBlockImageUpdateManyWithWhereWithoutPostInput";
import { ContentBlockImageUpdateWithWhereUniqueWithoutPostInput } from "../inputs/ContentBlockImageUpdateWithWhereUniqueWithoutPostInput";
import { ContentBlockImageUpsertWithWhereUniqueWithoutPostInput } from "../inputs/ContentBlockImageUpsertWithWhereUniqueWithoutPostInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageUpdateManyWithoutPostNestedInput", {})
export class ContentBlockImageUpdateManyWithoutPostNestedInput {
  @TypeGraphQL.Field(_type => [ContentBlockImageCreateWithoutPostInput], {
    nullable: true
  })
  create?: ContentBlockImageCreateWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageCreateOrConnectWithoutPostInput], {
    nullable: true
  })
  connectOrCreate?: ContentBlockImageCreateOrConnectWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageUpsertWithWhereUniqueWithoutPostInput], {
    nullable: true
  })
  upsert?: ContentBlockImageUpsertWithWhereUniqueWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateManyPostInputEnvelope, {
    nullable: true
  })
  createMany?: ContentBlockImageCreateManyPostInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereUniqueInput], {
    nullable: true
  })
  set?: ContentBlockImageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereUniqueInput], {
    nullable: true
  })
  disconnect?: ContentBlockImageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereUniqueInput], {
    nullable: true
  })
  delete?: ContentBlockImageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereUniqueInput], {
    nullable: true
  })
  connect?: ContentBlockImageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageUpdateWithWhereUniqueWithoutPostInput], {
    nullable: true
  })
  update?: ContentBlockImageUpdateWithWhereUniqueWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageUpdateManyWithWhereWithoutPostInput], {
    nullable: true
  })
  updateMany?: ContentBlockImageUpdateManyWithWhereWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ContentBlockImageScalarWhereInput[] | undefined;
}
