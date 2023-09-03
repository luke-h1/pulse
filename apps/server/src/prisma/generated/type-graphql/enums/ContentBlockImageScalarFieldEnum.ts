import * as TypeGraphQL from "type-graphql";

export enum ContentBlockImageScalarFieldEnum {
  id = "id",
  image = "image",
  imageFilename = "imageFilename",
  postId = "postId",
  projectId = "projectId",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(ContentBlockImageScalarFieldEnum, {
  name: "ContentBlockImageScalarFieldEnum",
  description: undefined,
});
