import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageWhereInput } from "../inputs/ContentBlockImageWhereInput";

@TypeGraphQL.InputType("ContentBlockImageListRelationFilter", {})
export class ContentBlockImageListRelationFilter {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereInput, {
    nullable: true
  })
  every?: ContentBlockImageWhereInput | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageWhereInput, {
    nullable: true
  })
  some?: ContentBlockImageWhereInput | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageWhereInput, {
    nullable: true
  })
  none?: ContentBlockImageWhereInput | undefined;
}
