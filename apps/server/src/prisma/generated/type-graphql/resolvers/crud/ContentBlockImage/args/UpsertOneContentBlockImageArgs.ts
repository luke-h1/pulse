import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageCreateInput } from "../../../inputs/ContentBlockImageCreateInput";
import { ContentBlockImageUpdateInput } from "../../../inputs/ContentBlockImageUpdateInput";
import { ContentBlockImageWhereUniqueInput } from "../../../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneContentBlockImageArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: false
  })
  where!: ContentBlockImageWhereUniqueInput;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateInput, {
    nullable: false
  })
  create!: ContentBlockImageCreateInput;

  @TypeGraphQL.Field(_type => ContentBlockImageUpdateInput, {
    nullable: false
  })
  update!: ContentBlockImageUpdateInput;
}
