import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateOrConnectWithoutTagsInput } from "../inputs/ProjectCreateOrConnectWithoutTagsInput";
import { ProjectCreateWithoutTagsInput } from "../inputs/ProjectCreateWithoutTagsInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType("ProjectCreateNestedOneWithoutTagsInput", {})
export class ProjectCreateNestedOneWithoutTagsInput {
  @TypeGraphQL.Field(_type => ProjectCreateWithoutTagsInput, {
    nullable: true
  })
  create?: ProjectCreateWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateOrConnectWithoutTagsInput, {
    nullable: true
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: true
  })
  connect?: ProjectWhereUniqueInput | undefined;
}
