import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { PostNullableRelationFilter } from "../inputs/PostNullableRelationFilter";
import { ProjectNullableRelationFilter } from "../inputs/ProjectNullableRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("TagWhereInput", {})
export class TagWhereInput {
  @TypeGraphQL.Field(_type => [TagWhereInput], {
    nullable: true
  })
  AND?: TagWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagWhereInput], {
    nullable: true
  })
  OR?: TagWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TagWhereInput], {
    nullable: true
  })
  NOT?: TagWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  title?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  slug?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  projectId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  postId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => PostNullableRelationFilter, {
    nullable: true
  })
  post?: PostNullableRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ProjectNullableRelationFilter, {
    nullable: true
  })
  project?: ProjectNullableRelationFilter | undefined;
}
