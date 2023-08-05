import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  id = "id",
  provider = "provider",
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  emailVerified = "emailVerified",
  username = "username",
  password = "password",
  image = "image",
  role = "role",
  github = "github",
  website = "website",
  twitter = "twitter",
  bio = "bio",
  location = "location",
  accountStatus = "accountStatus",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
