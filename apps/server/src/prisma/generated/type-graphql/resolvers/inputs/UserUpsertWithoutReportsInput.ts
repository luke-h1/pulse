import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutReportsInput } from "../inputs/UserCreateWithoutReportsInput";
import { UserUpdateWithoutReportsInput } from "../inputs/UserUpdateWithoutReportsInput";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType("UserUpsertWithoutReportsInput", {})
export class UserUpsertWithoutReportsInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutReportsInput, {
    nullable: false
  })
  update!: UserUpdateWithoutReportsInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutReportsInput, {
    nullable: false
  })
  create!: UserCreateWithoutReportsInput;

  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  where?: UserWhereInput | undefined;
}
