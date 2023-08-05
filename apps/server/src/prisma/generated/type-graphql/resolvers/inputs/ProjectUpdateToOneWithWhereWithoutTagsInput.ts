import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectUpdateWithoutTagsInput } from "../inputs/ProjectUpdateWithoutTagsInput";
import { ProjectWhereInput } from "../inputs/ProjectWhereInput";

@TypeGraphQL.InputType("ProjectUpdateToOneWithWhereWithoutTagsInput", {})
export class ProjectUpdateToOneWithWhereWithoutTagsInput {
  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true
  })
  where?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProjectUpdateWithoutTagsInput, {
    nullable: false
  })
  data!: ProjectUpdateWithoutTagsInput;
}
