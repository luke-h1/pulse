import * as TypeGraphQL from "type-graphql";

export enum ProjectOrderByRelevanceFieldEnum {
  id = "id",
  title = "title",
  intro = "intro",
  image = "image",
  githubUrl = "githubUrl",
  siteUrl = "siteUrl",
  appStoreUrl = "appStoreUrl",
  playStoreUrl = "playStoreUrl",
  tags = "tags",
  readingTime = "readingTime",
  authorId = "authorId"
}
TypeGraphQL.registerEnumType(ProjectOrderByRelevanceFieldEnum, {
  name: "ProjectOrderByRelevanceFieldEnum",
  description: undefined,
});
