import * as TypeGraphQL from "type-graphql";

export enum ProjectScalarFieldEnum {
  id = "id",
  title = "title",
  slug = "slug",
  intro = "intro",
  image = "image",
  content = "content",
  githubUrl = "githubUrl",
  siteUrl = "siteUrl",
  appStoreUrl = "appStoreUrl",
  playStoreUrl = "playStoreUrl",
  tags = "tags",
  status = "status",
  readingTime = "readingTime",
  authorId = "authorId",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(ProjectScalarFieldEnum, {
  name: "ProjectScalarFieldEnum",
  description: undefined,
});
