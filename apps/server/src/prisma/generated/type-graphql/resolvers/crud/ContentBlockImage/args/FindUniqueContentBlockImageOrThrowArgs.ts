import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageWhereUniqueInput } from "../../../inputs/ContentBlockImageWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueContentBlockImageOrThrowArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: false
  })
  where!: ContentBlockImageWhereUniqueInput;
}
