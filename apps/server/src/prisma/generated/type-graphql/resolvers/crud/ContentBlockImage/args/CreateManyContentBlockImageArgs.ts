import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageCreateManyInput } from "../../../inputs/ContentBlockImageCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyContentBlockImageArgs {
  @TypeGraphQL.Field(_type => [ContentBlockImageCreateManyInput], {
    nullable: false
  })
  data!: ContentBlockImageCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
