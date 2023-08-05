import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SortOrderInput } from "../inputs/SortOrderInput";
import { TagCountOrderByAggregateInput } from "../inputs/TagCountOrderByAggregateInput";
import { TagMaxOrderByAggregateInput } from "../inputs/TagMaxOrderByAggregateInput";
import { TagMinOrderByAggregateInput } from "../inputs/TagMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("TagOrderByWithAggregationInput", {})
export class TagOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  title?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  slug?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  projectId?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  postId?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => TagCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: TagCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TagMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: TagMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TagMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: TagMinOrderByAggregateInput | undefined;
}
