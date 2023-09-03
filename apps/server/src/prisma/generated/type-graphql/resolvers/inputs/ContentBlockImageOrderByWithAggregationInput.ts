import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCountOrderByAggregateInput } from "../inputs/ContentBlockImageCountOrderByAggregateInput";
import { ContentBlockImageMaxOrderByAggregateInput } from "../inputs/ContentBlockImageMaxOrderByAggregateInput";
import { ContentBlockImageMinOrderByAggregateInput } from "../inputs/ContentBlockImageMinOrderByAggregateInput";
import { SortOrderInput } from "../inputs/SortOrderInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ContentBlockImageOrderByWithAggregationInput", {})
export class ContentBlockImageOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  image?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  imageFilename?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  postId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  projectId?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ContentBlockImageCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ContentBlockImageMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ContentBlockImageMinOrderByAggregateInput | undefined;
}
