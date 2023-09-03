import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateWithoutContentBlockImageInput } from "../inputs/ProjectCreateWithoutContentBlockImageInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType("ProjectCreateOrConnectWithoutContentBlockImageInput", {})
export class ProjectCreateOrConnectWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectCreateWithoutContentBlockImageInput, {
    nullable: false
  })
  create!: ProjectCreateWithoutContentBlockImageInput;
}
