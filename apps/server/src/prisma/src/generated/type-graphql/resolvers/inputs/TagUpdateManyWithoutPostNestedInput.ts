import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateManyPostInputEnvelope } from "../inputs/TagCreateManyPostInputEnvelope";
import { TagCreateOrConnectWithoutPostInput } from "../inputs/TagCreateOrConnectWithoutPostInput";
import { TagCreateWithoutPostInput } from "../inputs/TagCreateWithoutPostInput";
import { TagScalarWhereInput } from "../inputs/TagScalarWhereInput";
import { TagUpdateManyWithWhereWithoutPostInput } from "../inputs/TagUpdateManyWithWhereWithoutPostInput";
import { TagUpdateWithWhereUniqueWithoutPostInput } from "../inputs/TagUpdateWithWhereUniqueWithoutPostInput";
import { TagUpsertWithWhereUniqueWithoutPostInput } from "../inputs/TagUpsertWithWhereUniqueWithoutPostInput";
import { TagWhereUniqueInput } from "../inputs/TagWhereUniqueInput";

@TypeGraphQL.InputType("TagUpdateManyWithoutPostNestedInput", {})
export class TagUpdateManyWithoutPostNestedInput {
  @TypeGraphQL.Field(_type => [TagCreateWithoutPostInput], {
    nullable: true
  })
  create?: TagCreateWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagCreateOrConnectWithoutPostInput], {
    nullable: true
  })
  connectOrCreate?: TagCreateOrConnectWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagUpsertWithWhereUniqueWithoutPostInput], {
    nullable: true
  })
  upsert?: TagUpsertWithWhereUniqueWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => TagCreateManyPostInputEnvelope, {
    nullable: true
  })
  createMany?: TagCreateManyPostInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [TagUpdateWithWhereUniqueWithoutPostInput], {
    nullable: true
  })
  update?: TagUpdateWithWhereUniqueWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagUpdateManyWithWhereWithoutPostInput], {
    nullable: true
  })
  updateMany?: TagUpdateManyWithWhereWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagScalarWhereInput], {
    nullable: true
  })
  deleteMany?: TagScalarWhereInput[] | undefined;
}
