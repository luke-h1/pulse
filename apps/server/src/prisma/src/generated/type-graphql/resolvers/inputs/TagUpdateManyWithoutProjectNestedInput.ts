import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateManyProjectInputEnvelope } from "../inputs/TagCreateManyProjectInputEnvelope";
import { TagCreateOrConnectWithoutProjectInput } from "../inputs/TagCreateOrConnectWithoutProjectInput";
import { TagCreateWithoutProjectInput } from "../inputs/TagCreateWithoutProjectInput";
import { TagScalarWhereInput } from "../inputs/TagScalarWhereInput";
import { TagUpdateManyWithWhereWithoutProjectInput } from "../inputs/TagUpdateManyWithWhereWithoutProjectInput";
import { TagUpdateWithWhereUniqueWithoutProjectInput } from "../inputs/TagUpdateWithWhereUniqueWithoutProjectInput";
import { TagUpsertWithWhereUniqueWithoutProjectInput } from "../inputs/TagUpsertWithWhereUniqueWithoutProjectInput";
import { TagWhereUniqueInput } from "../inputs/TagWhereUniqueInput";

@TypeGraphQL.InputType("TagUpdateManyWithoutProjectNestedInput", {})
export class TagUpdateManyWithoutProjectNestedInput {
  @TypeGraphQL.Field(_type => [TagCreateWithoutProjectInput], {
    nullable: true
  })
  create?: TagCreateWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagCreateOrConnectWithoutProjectInput], {
    nullable: true
  })
  connectOrCreate?: TagCreateOrConnectWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagUpsertWithWhereUniqueWithoutProjectInput], {
    nullable: true
  })
  upsert?: TagUpsertWithWhereUniqueWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => TagCreateManyProjectInputEnvelope, {
    nullable: true
  })
  createMany?: TagCreateManyProjectInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TagWhereUniqueInput], {
    nullable: true
  })
  set?: TagWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagWhereUniqueInput], {
    nullable: true
  })
  disconnect?: TagWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagWhereUniqueInput], {
    nullable: true
  })
  delete?: TagWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagWhereUniqueInput], {
    nullable: true
  })
  connect?: TagWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagUpdateWithWhereUniqueWithoutProjectInput], {
    nullable: true
  })
  update?: TagUpdateWithWhereUniqueWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagUpdateManyWithWhereWithoutProjectInput], {
    nullable: true
  })
  updateMany?: TagUpdateManyWithWhereWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagScalarWhereInput], {
    nullable: true
  })
  deleteMany?: TagScalarWhereInput[] | undefined;
}
