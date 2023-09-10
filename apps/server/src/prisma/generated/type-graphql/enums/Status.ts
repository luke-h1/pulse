import * as TypeGraphQL from 'type-graphql';

export enum Status {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
}
TypeGraphQL.registerEnumType(Status, {
  name: 'Status',
  description: undefined,
});
