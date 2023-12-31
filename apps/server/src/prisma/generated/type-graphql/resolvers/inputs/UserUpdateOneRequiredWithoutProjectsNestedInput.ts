import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutProjectsInput } from "../inputs/UserCreateOrConnectWithoutProjectsInput";
import { UserCreateWithoutProjectsInput } from "../inputs/UserCreateWithoutProjectsInput";
import { UserUpdateToOneWithWhereWithoutProjectsInput } from "../inputs/UserUpdateToOneWithWhereWithoutProjectsInput";
import { UserUpsertWithoutProjectsInput } from "../inputs/UserUpsertWithoutProjectsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateOneRequiredWithoutProjectsNestedInput", {})
export class UserUpdateOneRequiredWithoutProjectsNestedInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutProjectsInput, {
    nullable: true
  })
  create?: UserCreateWithoutProjectsInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutProjectsInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutProjectsInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutProjectsInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutProjectsInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateToOneWithWhereWithoutProjectsInput, {
    nullable: true
  })
  update?: UserUpdateToOneWithWhereWithoutProjectsInput | undefined;
}
