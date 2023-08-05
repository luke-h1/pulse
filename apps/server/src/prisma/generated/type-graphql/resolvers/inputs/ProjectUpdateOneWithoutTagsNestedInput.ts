import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateOrConnectWithoutTagsInput } from "../inputs/ProjectCreateOrConnectWithoutTagsInput";
import { ProjectCreateWithoutTagsInput } from "../inputs/ProjectCreateWithoutTagsInput";
import { ProjectUpdateToOneWithWhereWithoutTagsInput } from "../inputs/ProjectUpdateToOneWithWhereWithoutTagsInput";
import { ProjectUpsertWithoutTagsInput } from "../inputs/ProjectUpsertWithoutTagsInput";
import { ProjectWhereInput } from "../inputs/ProjectWhereInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType("ProjectUpdateOneWithoutTagsNestedInput", {})
export class ProjectUpdateOneWithoutTagsNestedInput {
  @TypeGraphQL.Field(_type => ProjectCreateWithoutTagsInput, {
    nullable: true
  })
  create?: ProjectCreateWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateOrConnectWithoutTagsInput, {
    nullable: true
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => ProjectUpsertWithoutTagsInput, {
    nullable: true
  })
  upsert?: ProjectUpsertWithoutTagsInput | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true
  })
  disconnect?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true
  })
  delete?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: true
  })
  connect?: ProjectWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => ProjectUpdateToOneWithWhereWithoutTagsInput, {
    nullable: true
  })
  update?: ProjectUpdateToOneWithWhereWithoutTagsInput | undefined;
}
