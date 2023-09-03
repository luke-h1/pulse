import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("ContentBlockImageScalarWhereInput", {})
export class ContentBlockImageScalarWhereInput {
  @TypeGraphQL.Field(_type => [ContentBlockImageScalarWhereInput], {
    nullable: true
  })
  AND?: ContentBlockImageScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageScalarWhereInput], {
    nullable: true
  })
  OR?: ContentBlockImageScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageScalarWhereInput], {
    nullable: true
  })
  NOT?: ContentBlockImageScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  image?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  imageFilename?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  postId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  projectId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;
}
