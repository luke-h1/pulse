import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateWithoutTagsInput } from "../inputs/ProjectCreateWithoutTagsInput";
import { ProjectUpdateWithoutTagsInput } from "../inputs/ProjectUpdateWithoutTagsInput";
import { ProjectWhereInput } from "../inputs/ProjectWhereInput";

@TypeGraphQL.InputType("ProjectUpsertWithoutTagsInput", {})
export class ProjectUpsertWithoutTagsInput {
  @TypeGraphQL.Field(_type => ProjectUpdateWithoutTagsInput, {
    nullable: false
  })
  update!: ProjectUpdateWithoutTagsInput;

  @TypeGraphQL.Field(_type => ProjectCreateWithoutTagsInput, {
    nullable: false
  })
  create!: ProjectCreateWithoutTagsInput;

  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true
  })
  where?: ProjectWhereInput | undefined;
}
