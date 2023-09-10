import * as TypeGraphQL from 'type-graphql';

export enum ProjectScalarFieldEnum {
  id = 'id',
  title = 'title',
  intro = 'intro',
  image = 'image',
  content = 'content',
  githubUrl = 'githubUrl',
  siteUrl = 'siteUrl',
  appStoreUrl = 'appStoreUrl',
  playStoreUrl = 'playStoreUrl',
  tags = 'tags',
  status = 'status',
  authorId = 'authorId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
TypeGraphQL.registerEnumType(ProjectScalarFieldEnum, {
  name: 'ProjectScalarFieldEnum',
  description: undefined,
});
