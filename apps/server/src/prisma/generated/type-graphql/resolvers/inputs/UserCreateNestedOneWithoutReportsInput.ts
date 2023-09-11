import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutReportsInput } from "../inputs/UserCreateOrConnectWithoutReportsInput";
import { UserCreateWithoutReportsInput } from "../inputs/UserCreateWithoutReportsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateNestedOneWithoutReportsInput", {})
export class UserCreateNestedOneWithoutReportsInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutReportsInput, {
    nullable: true
  })
  create?: UserCreateWithoutReportsInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutReportsInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutReportsInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
