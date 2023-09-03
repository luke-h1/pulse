import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateManyPostInputEnvelope } from "../inputs/ContentBlockImageCreateManyPostInputEnvelope";
import { ContentBlockImageCreateOrConnectWithoutPostInput } from "../inputs/ContentBlockImageCreateOrConnectWithoutPostInput";
import { ContentBlockImageCreateWithoutPostInput } from "../inputs/ContentBlockImageCreateWithoutPostInput";
import { ContentBlockImageWhereUniqueInput } from "../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.InputType("ContentBlockImageCreateNestedManyWithoutPostInput", {})
export class ContentBlockImageCreateNestedManyWithoutPostInput {
  @TypeGraphQL.Field(_type => [ContentBlockImageCreateWithoutPostInput], {
    nullable: true
  })
  create?: ContentBlockImageCreateWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageCreateOrConnectWithoutPostInput], {
    nullable: true
  })
  connectOrCreate?: ContentBlockImageCreateOrConnectWithoutPostInput[] | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateManyPostInputEnvelope, {
    nullable: true
  })
  createMany?: ContentBlockImageCreateManyPostInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereUniqueInput], {
    nullable: true
  })
  connect?: ContentBlockImageWhereUniqueInput[] | undefined;
}
