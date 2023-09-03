import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageWhereInput } from "../inputs/ContentBlockImageWhereInput";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { PostRelationFilter } from "../inputs/PostRelationFilter";
import { ProjectNullableRelationFilter } from "../inputs/ProjectNullableRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("ContentBlockImageWhereUniqueInput", {})
export class ContentBlockImageWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereInput], {
    nullable: true
  })
  AND?: ContentBlockImageWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereInput], {
    nullable: true
  })
  OR?: ContentBlockImageWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageWhereInput], {
    nullable: true
  })
  NOT?: ContentBlockImageWhereInput[] | undefined;

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

  @TypeGraphQL.Field(_type => PostRelationFilter, {
    nullable: true
  })
  post?: PostRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ProjectNullableRelationFilter, {
    nullable: true
  })
  project?: ProjectNullableRelationFilter | undefined;
}
