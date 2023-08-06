import * as TypeGraphQL from "type-graphql";

export enum Status {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT"
}
TypeGraphQL.registerEnumType(Status, {
  name: "Status",
  description: undefined,
});
