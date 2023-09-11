import * as TypeGraphQL from "type-graphql";

export enum AdminReportScalarFieldEnum {
  id = "id",
  title = "title",
  content = "content",
  authorId = "authorId",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(AdminReportScalarFieldEnum, {
  name: "AdminReportScalarFieldEnum",
  description: undefined,
});
