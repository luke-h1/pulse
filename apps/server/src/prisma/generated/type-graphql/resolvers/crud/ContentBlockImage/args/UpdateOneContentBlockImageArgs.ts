import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageUpdateInput } from "../../../inputs/ContentBlockImageUpdateInput";
import { ContentBlockImageWhereUniqueInput } from "../../../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneContentBlockImageArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageUpdateInput, {
    nullable: false
  })
  data!: ContentBlockImageUpdateInput;

  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: false
  })
  where!: ContentBlockImageWhereUniqueInput;
}
