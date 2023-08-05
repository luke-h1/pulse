import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateManyProjectInputEnvelope } from "../inputs/TagCreateManyProjectInputEnvelope";
import { TagCreateOrConnectWithoutProjectInput } from "../inputs/TagCreateOrConnectWithoutProjectInput";
import { TagCreateWithoutProjectInput } from "../inputs/TagCreateWithoutProjectInput";
import { TagWhereUniqueInput } from "../inputs/TagWhereUniqueInput";

@TypeGraphQL.InputType("TagCreateNestedManyWithoutProjectInput", {})
export class TagCreateNestedManyWithoutProjectInput {
  @TypeGraphQL.Field(_type => [TagCreateWithoutProjectInput], {
    nullable: true
  })
  create?: TagCreateWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagCreateOrConnectWithoutProjectInput], {
    nullable: true
  })
  connectOrCreate?: TagCreateOrConnectWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => TagCreateManyProjectInputEnvelope, {
    nullable: true
  })
  createMany?: TagCreateManyProjectInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TagWhereUniqueInput], {
    nullable: true
  })
  connect?: TagWhereUniqueInput[] | undefined;
}
