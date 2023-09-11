import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutReportsInput } from "../inputs/UserCreateOrConnectWithoutReportsInput";
import { UserCreateWithoutReportsInput } from "../inputs/UserCreateWithoutReportsInput";
import { UserUpdateToOneWithWhereWithoutReportsInput } from "../inputs/UserUpdateToOneWithWhereWithoutReportsInput";
import { UserUpsertWithoutReportsInput } from "../inputs/UserUpsertWithoutReportsInput";
import { UserWhereInput } from "../inputs/UserWhereInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateOneWithoutReportsNestedInput", {})
export class UserUpdateOneWithoutReportsNestedInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutReportsInput, {
    nullable: true
  })
  create?: UserCreateWithoutReportsInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutReportsInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutReportsInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutReportsInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutReportsInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  disconnect?: UserWhereInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  delete?: UserWhereInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateToOneWithWhereWithoutReportsInput, {
    nullable: true
  })
  update?: UserUpdateToOneWithWhereWithoutReportsInput | undefined;
}
