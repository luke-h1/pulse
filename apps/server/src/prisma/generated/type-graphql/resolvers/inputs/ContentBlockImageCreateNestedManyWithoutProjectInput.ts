import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateManyProjectInputEnvelope } from "../inputs/ContentBlockImageCreateManyProjectInputEnvelope";
import { ContentBlockImageCreateOrConnectWithoutProjectInput } from "../inputs/ContentBlockImageCreateOrConnectWithoutProjectInput";
import { ContentBlockImageCreateWithoutProjectInput } from "../inputs/ContentBlockImageCreateWithoutProjectInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageCreateNestedManyWithoutProjectInput", {})
export class ContentBlockImageCreateNestedManyWithoutProjectInput {
  @TypeGraphQL.Field(_type => [ContentBlockImageCreateWithoutProjectInput], {
    nullable: true
  })
  create?: ContentBlockImageCreateWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageCreateOrConnectWithoutProjectInput], {
    nullable: true
  })
  connectOrCreate?: ContentBlockImageCreateOrConnectWithoutProjectInput[] | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateManyProjectInputEnvelope, {
    nullable: true
  })
  createMany?: ContentBlockImageCreateManyProjectInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereUniqueInput], {
    nullable: true
  })
  connect?: ContentBlockImageWhereUniqueInput[] | undefined;
}
