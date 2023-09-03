import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageCreateInput } from "../../../inputs/ContentBlockImageCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneContentBlockImageArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageCreateInput, {
    nullable: false
  })
  data!: ContentBlockImageCreateInput;
}
