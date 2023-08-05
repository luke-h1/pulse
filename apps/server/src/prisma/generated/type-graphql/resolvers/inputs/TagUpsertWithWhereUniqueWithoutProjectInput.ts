import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateWithoutProjectInput } from "../inputs/TagCreateWithoutProjectInput";
import { TagUpdateWithoutProjectInput } from "../inputs/TagUpdateWithoutProjectInput";
import { TagWhereUniqueInput } from "../inputs/TagWhereUniqueInput";

@TypeGraphQL.InputType("TagUpsertWithWhereUniqueWithoutProjectInput", {})
export class TagUpsertWithWhereUniqueWithoutProjectInput {
  @TypeGraphQL.Field(_type => TagWhereUniqueInput, {
    nullable: false
  })
  where!: TagWhereUniqueInput;

  @TypeGraphQL.Field(_type => TagUpdateWithoutProjectInput, {
    nullable: false
  })
  update!: TagUpdateWithoutProjectInput;

  @TypeGraphQL.Field(_type => TagCreateWithoutProjectInput, {
    nullable: false
  })
  create!: TagCreateWithoutProjectInput;
}
