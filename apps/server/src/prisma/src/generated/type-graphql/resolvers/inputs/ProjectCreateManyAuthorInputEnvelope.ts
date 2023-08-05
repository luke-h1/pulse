import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateManyAuthorInput } from "../inputs/ProjectCreateManyAuthorInput";

@TypeGraphQL.InputType("ProjectCreateManyAuthorInputEnvelope", {})
export class ProjectCreateManyAuthorInputEnvelope {
  @TypeGraphQL.Field(_type => [ProjectCreateManyAuthorInput], {
    nullable: false
  })
  data!: ProjectCreateManyAuthorInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
