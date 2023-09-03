import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateWithoutContentBlockImageInput } from "../inputs/ProjectCreateWithoutContentBlockImageInput";
import { ProjectUpdateWithoutContentBlockImageInput } from "../inputs/ProjectUpdateWithoutContentBlockImageInput";
import { ProjectWhereInput } from "../inputs/ProjectWhereInput";

@TypeGraphQL.InputType("ProjectUpsertWithoutContentBlockImageInput", {})
export class ProjectUpsertWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => ProjectUpdateWithoutContentBlockImageInput, {
    nullable: false
  })
  update!: ProjectUpdateWithoutContentBlockImageInput;

  @TypeGraphQL.Field(_type => ProjectCreateWithoutContentBlockImageInput, {
    nullable: false
  })
  create!: ProjectCreateWithoutContentBlockImageInput;

  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true
  })
  where?: ProjectWhereInput | undefined;
}
