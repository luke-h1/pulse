import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateManyProjectInputEnvelope } from "../inputs/ContentBlockImageCreateManyProjectInputEnvelope";
import { ContentBlockImageCreateOrConnectWithoutProjectInput } from "../inputs/ContentBlockImageCreateOrConnectWithoutProjectInput";
import { ContentBlockImageCreateWithoutProjectInput } from "../inputs/ContentBlockImageCreateWithoutProjectInput";
import { ContentBlockImageScalarWhereInput } from "../inputs/ContentBlockImageScalarWhereInput";
import { ContentBlockImageUpdateManyWithWhereWithoutProjectInput } from "../inputs/ContentBlockImageUpdateManyWithWhereWithoutProjectInput";
import { ContentBlockImageUpdateWithWhereUniqueWithoutProjectInput } from "../inputs/ContentBlockImageUpdateWithWhereUniqueWithoutProjectInput";
import { ContentBlockImageUpsertWithWhereUniqueWithoutProjectInput } from "../inputs/ContentBlockImageUpsertWithWhereUniqueWithoutProjectInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageUpdateManyWithoutProjectNestedInput", {})
export class ContentBlockImageUpdateManyWithoutProjectNestedInput {
  @TypeGraphQL.Field(_type => [ContentBlockImageCreateWithoutProjectInput], {
    nullable: true
  })
  create?: ContentBlockImageCreateWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageCreateOrConnectWithoutProjectInput], {
    nullable: true
  })
  connectOrCreate?: ContentBlockImageCreateOrConnectWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageUpsertWithWhereUniqueWithoutProjectInput], {
    nullable: true
  })
  upsert?: ContentBlockImageUpsertWithWhereUniqueWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateManyProjectInputEnvelope, {
    nullable: true
  })
  createMany?: ContentBlockImageCreateManyProjectInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [ContentBlockImageUpdateWithWhereUniqueWithoutProjectInput], {
    nullable: true
  })
  update?: ContentBlockImageUpdateWithWhereUniqueWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageUpdateManyWithWhereWithoutProjectInput], {
    nullable: true
  })
  updateMany?: ContentBlockImageUpdateManyWithWhereWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ContentBlockImageScalarWhereInput[] | undefined;
}
