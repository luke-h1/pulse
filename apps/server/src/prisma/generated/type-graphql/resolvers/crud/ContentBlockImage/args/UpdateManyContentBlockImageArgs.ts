import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageUpdateManyMutationInput } from "../../../inputs/ContentBlockImageUpdateManyMutationInput";
import { ContentBlockImageWhereInput } from "../../../inputs/ContentBlockImageWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyContentBlockImageArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageUpdateManyMutationInput, {
    nullable: false
  })
  data!: ContentBlockImageUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ContentBlockImageWhereInput, {
    nullable: true
  })
  where?: ContentBlockImageWhereInput | undefined;
}
