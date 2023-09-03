import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageWhereInput } from "../../inputs/ContentBlockImageWhereInput";

@TypeGraphQL.ArgsType()
export class PostCountContentBlockImageArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereInput, {
    nullable: true
  })
  where?: ContentBlockImageWhereInput | undefined;
}
