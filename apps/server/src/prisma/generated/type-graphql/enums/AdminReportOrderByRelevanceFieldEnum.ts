import * as TypeGraphQL from "type-graphql";

export enum AdminReportOrderByRelevanceFieldEnum {
  id = "id",
  title = "title",
  authorId = "authorId"
}
TypeGraphQL.registerEnumType(AdminReportOrderByRelevanceFieldEnum, {
  name: "AdminReportOrderByRelevanceFieldEnum",
  description: undefined,
});
