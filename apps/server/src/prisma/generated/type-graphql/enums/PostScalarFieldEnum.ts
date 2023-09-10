import * as TypeGraphQL from 'type-graphql';

export enum PostScalarFieldEnum {
  id = 'id',
  title = 'title',
  intro = 'intro',
  image = 'image',
  tags = 'tags',
  content = 'content',
  status = 'status',
  authorId = 'authorId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
TypeGraphQL.registerEnumType(PostScalarFieldEnum, {
  name: 'PostScalarFieldEnum',
  description: undefined,
});
