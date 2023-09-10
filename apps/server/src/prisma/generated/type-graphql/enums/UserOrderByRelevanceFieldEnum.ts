import * as TypeGraphQL from 'type-graphql';

export enum UserOrderByRelevanceFieldEnum {
  id = 'id',
  provider = 'provider',
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
  username = 'username',
  password = 'password',
  image = 'image',
  github = 'github',
  website = 'website',
  twitter = 'twitter',
  bio = 'bio',
  location = 'location',
}
TypeGraphQL.registerEnumType(UserOrderByRelevanceFieldEnum, {
  name: 'UserOrderByRelevanceFieldEnum',
  description: undefined,
});
