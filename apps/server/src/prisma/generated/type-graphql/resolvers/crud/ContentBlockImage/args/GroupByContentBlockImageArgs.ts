import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageOrderByWithAggregationInput } from "../../../inputs/ContentBlockImageOrderByWithAggregationInput";
import { ContentBlockImageScalarWhereWithAggregatesInput } from "../../../inputs/ContentBlockImageScalarWhereWithAggregatesInput";
import { ContentBlockImageWhereInput } from "../../../inputs/ContentBlockImageWhereInput";
import { ContentBlockImageScalarFieldEnum } from "../../../../enums/ContentBlockImageScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByContentBlockImageArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereInput, {
    nullable: true
  })
  where?: ContentBlockImageWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: ContentBlockImageOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "image" | "imageFilename" | "postId" | "projectId" | "createdAt" | "updatedAt">;

  @TypeGraphQL.Field(_type => ContentBlockImageScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: ContentBlockImageScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
