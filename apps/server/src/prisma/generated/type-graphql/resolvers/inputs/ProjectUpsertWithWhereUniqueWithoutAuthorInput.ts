import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateWithoutAuthorInput } from "../inputs/ProjectCreateWithoutAuthorInput";
import { ProjectUpdateWithoutAuthorInput } from "../inputs/ProjectUpdateWithoutAuthorInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType("ProjectUpsertWithWhereUniqueWithoutAuthorInput", {})
export class ProjectUpsertWithWhereUniqueWithoutAuthorInput {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectUpdateWithoutAuthorInput, {
    nullable: false
  })
  update!: ProjectUpdateWithoutAuthorInput;

  @TypeGraphQL.Field(_type => ProjectCreateWithoutAuthorInput, {
    nullable: false
  })
  create!: ProjectCreateWithoutAuthorInput;
}
