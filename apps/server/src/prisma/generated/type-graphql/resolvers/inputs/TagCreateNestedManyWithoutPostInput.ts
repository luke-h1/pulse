import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateManyPostInputEnvelope } from "../inputs/TagCreateManyPostInputEnvelope";
import { TagCreateOrConnectWithoutPostInput } from "../inputs/TagCreateOrConnectWithoutPostInput";
import { TagCreateWithoutPostInput } from "../inputs/TagCreateWithoutPostInput";
import { TagWhereUniqueInput } from "../inputs/TagWhereUniqueInput";

@TypeGraphQL.InputType("TagCreateNestedManyWithoutPostInput", {})
export class TagCreateNestedManyWithoutPostInput {
  @TypeGraphQL.Field(_type => [TagCreateWithoutPostInput], {
    nullable: true
  })
  create?: TagCreateWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagCreateOrConnectWithoutPostInput], {
    nullable: true
  })
  connectOrCreate?: TagCreateOrConnectWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => TagCreateManyPostInputEnvelope, {
    nullable: true
  })
  createMany?: TagCreateManyPostInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TagWhereUniqueInput], {
    nullable: true
  })
  connect?: TagWhereUniqueInput[] | undefined;
}
