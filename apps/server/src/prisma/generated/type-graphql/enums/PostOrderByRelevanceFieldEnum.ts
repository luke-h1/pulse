import * as TypeGraphQL from "type-graphql";

export enum PostOrderByRelevanceFieldEnum {
  id = "id",
  title = "title",
  intro = "intro",
  image = "image",
  tags = "tags",
  readingTime = "readingTime",
  authorId = "authorId"
}
TypeGraphQL.registerEnumType(PostOrderByRelevanceFieldEnum, {
  name: "PostOrderByRelevanceFieldEnum",
  description: undefined,
});
