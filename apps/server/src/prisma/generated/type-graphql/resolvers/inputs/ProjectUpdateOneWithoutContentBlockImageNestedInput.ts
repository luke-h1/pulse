import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateOrConnectWithoutContentBlockImageInput } from "../inputs/ProjectCreateOrConnectWithoutContentBlockImageInput";
import { ProjectCreateWithoutContentBlockImageInput } from "../inputs/ProjectCreateWithoutContentBlockImageInput";
import { ProjectUpdateToOneWithWhereWithoutContentBlockImageInput } from "../inputs/ProjectUpdateToOneWithWhereWithoutContentBlockImageInput";
import { ProjectUpsertWithoutContentBlockImageInput } from "../inputs/ProjectUpsertWithoutContentBlockImageInput";
import { ProjectWhereInput } from "../inputs/ProjectWhereInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType("ProjectUpdateOneWithoutContentBlockImageNestedInput", {})
export class ProjectUpdateOneWithoutContentBlockImageNestedInput {
  @TypeGraphQL.Field(_type => ProjectCreateWithoutContentBlockImageInput, {
    nullable: true
  })
  create?: ProjectCreateWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateOrConnectWithoutContentBlockImageInput, {
    nullable: true
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutContentBlockImageInput | undefined;

  @TypeGraphQL.Field(_type => ProjectUpsertWithoutContentBlockImageInput, {
    nullable: true
  })
  upsert?: ProjectUpsertWithoutContentBlockImageInput | undefined;

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

  @TypeGraphQL.Field(_type => ProjectUpdateToOneWithWhereWithoutContentBlockImageInput, {
    nullable: true
  })
  update?: ProjectUpdateToOneWithWhereWithoutContentBlockImageInput | undefined;
}
