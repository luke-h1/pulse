import * as TypeGraphQL from "type-graphql";

export enum PostScalarFieldEnum {
  id = "id",
  title = "title",
  slug = "slug",
  intro = "intro",
  image = "image",
  imageFilename = "imageFilename",
  tags = "tags",
  content = "content",
  status = "status",
  readingTime = "readingTime",
  authorId = "authorId",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(PostScalarFieldEnum, {
  name: "PostScalarFieldEnum",
  description: undefined,
});
