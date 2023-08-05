import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateWithoutPostInput } from "../inputs/TagCreateWithoutPostInput";
import { TagUpdateWithoutPostInput } from "../inputs/TagUpdateWithoutPostInput";
import { TagWhereUniqueInput } from "../inputs/TagWhereUniqueInput";

@TypeGraphQL.InputType("TagUpsertWithWhereUniqueWithoutPostInput", {})
export class TagUpsertWithWhereUniqueWithoutPostInput {
  @TypeGraphQL.Field(_type => TagWhereUniqueInput, {
    nullable: false
  })
  where!: TagWhereUniqueInput;

  @TypeGraphQL.Field(_type => TagUpdateWithoutPostInput, {
    nullable: false
  })
  update!: TagUpdateWithoutPostInput;

  @TypeGraphQL.Field(_type => TagCreateWithoutPostInput, {
    nullable: false
  })
  create!: TagCreateWithoutPostInput;
}
