import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateOrConnectWithoutContentBlockImageInput } from "../inputs/ProjectCreateOrConnectWithoutContentBlockImageInput";
import { ProjectCreateWithoutContentBlockImageInput } from "../inputs/ProjectCreateWithoutContentBlockImageInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType("ProjectCreateNestedOneWithoutContentBlockImageInput", {})
export class ProjectCreateNestedOneWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => ProjectCreateWithoutContentBlockImageInput, {
    nullable: true
  })
  create?: ProjectCreateWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateOrConnectWithoutContentBlockImageInput, {
    nullable: true
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: true
  })
  connect?: ProjectWhereUniqueInput | undefined;
}
