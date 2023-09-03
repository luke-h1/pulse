import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContentBlockImageOrderByWithRelationAndSearchRelevanceInput } from "../../../inputs/ContentBlockImageOrderByWithRelationAndSearchRelevanceInput";
import { ContentBlockImageWhereInput } from "../../../inputs/ContentBlockImageWhereInput";
import { ContentBlockImageWhereUniqueInput } from "../../../inputs/ContentBlockImageWhereUniqueInput";
import { ContentBlockImageScalarFieldEnum } from "../../../../enums/ContentBlockImageScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstContentBlockImageOrThrowArgs {
  @TypeGraphQL.Field(_type => ContentBlockImageWhereInput, {
    nullable: true
  })
  where?: ContentBlockImageWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: ContentBlockImageOrderByWithRelationAndSearchRelevanceInput[] | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageWhereUniqueInput, {
    nullable: true
  })
  cursor?: ContentBlockImageWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ContentBlockImageScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "image" | "imageFilename" | "postId" | "projectId" | "createdAt" | "updatedAt"> | undefined;
}
