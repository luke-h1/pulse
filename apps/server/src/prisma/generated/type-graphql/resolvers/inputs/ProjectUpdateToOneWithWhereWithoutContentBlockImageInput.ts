import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectUpdateWithoutContentBlockImageInput } from "../inputs/ProjectUpdateWithoutContentBlockImageInput";
import { ProjectWhereInput } from "../inputs/ProjectWhereInput";

@TypeGraphQL.InputType("ProjectUpdateToOneWithWhereWithoutContentBlockImageInput", {})
export class ProjectUpdateToOneWithWhereWithoutContentBlockImageInput {
  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true
  })
  where?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProjectUpdateWithoutContentBlockImageInput, {
    nullable: false
  })
  data!: ProjectUpdateWithoutContentBlockImageInput;
}
