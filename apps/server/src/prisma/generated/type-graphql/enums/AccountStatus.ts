import * as TypeGraphQL from "type-graphql";

export enum AccountStatus {
  BANNED = "BANNED",
  ON_HOLD = "ON_HOLD",
  ACTIVE = "ACTIVE"
}
TypeGraphQL.registerEnumType(AccountStatus, {
  name: "AccountStatus",
  description: undefined,
});
