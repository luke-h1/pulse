import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TagCreateNestedManyWithoutProjectInput } from "../inputs/TagCreateNestedManyWithoutProjectInput";

@TypeGraphQL.InputType("ProjectCreateWithoutAuthorInput", {})
export class ProjectCreateWithoutAuthorInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  slug!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  intro!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image?: string | undefined;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: false
  })
  content!: Prisma.InputJsonValue;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  githubUrl?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  siteUrl?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  appStoreUrl?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  playStoreUrl?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => TagCreateNestedManyWithoutProjectInput, {
    nullable: true
  })
  tags?: TagCreateNestedManyWithoutProjectInput | undefined;
}