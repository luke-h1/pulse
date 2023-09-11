import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectUpdateWithoutAuthorInput } from "../inputs/ProjectUpdateWithoutAuthorInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType("ProjectUpdateWithWhereUniqueWithoutAuthorInput", {})
export class ProjectUpdateWithWhereUniqueWithoutAuthorInput {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectUpdateWithoutAuthorInput, {
    nullable: false
  })
  data!: ProjectUpdateWithoutAuthorInput;
}
