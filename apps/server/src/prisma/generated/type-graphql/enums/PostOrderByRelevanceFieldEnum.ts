import * as TypeGraphQL from "type-graphql";

export enum PostOrderByRelevanceFieldEnum {
  id = "id",
  title = "title",
  slug = "slug",
  intro = "intro",
  image = "image",
  tags = "tags",
  authorId = "authorId"
}
TypeGraphQL.registerEnumType(PostOrderByRelevanceFieldEnum, {
  name: "PostOrderByRelevanceFieldEnum",
  description: undefined,
});
