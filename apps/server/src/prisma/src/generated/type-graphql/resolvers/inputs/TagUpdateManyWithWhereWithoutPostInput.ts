import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { TagScalarWhereInput } from "../inputs/TagScalarWhereInput";
import { TagUpdateManyMutationInput } from "../inputs/TagUpdateManyMutationInput";

@TypeGraphQL.InputType("TagUpdateManyWithWhereWithoutPostInput", {})
export class TagUpdateManyWithWhereWithoutPostInput {
  @TypeGraphQL.Field(_type => TagScalarWhereInput, {
    nullable: false
  })
  where!: TagScalarWhereInput;

  @TypeGraphQL.Field(_type => TagUpdateManyMutationInput, {
    nullable: false
  })
  data!: TagUpdateManyMutationInput;
}
