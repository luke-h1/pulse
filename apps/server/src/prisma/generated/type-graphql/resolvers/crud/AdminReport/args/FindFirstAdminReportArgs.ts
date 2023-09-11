import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportOrderByWithRelationAndSearchRelevanceInput } from "../../../inputs/AdminReportOrderByWithRelationAndSearchRelevanceInput";
import { AdminReportWhereInput } from "../../../inputs/AdminReportWhereInput";
import { AdminReportWhereUniqueInput } from "../../../inputs/AdminReportWhereUniqueInput";
import { AdminReportScalarFieldEnum } from "../../../../enums/AdminReportScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstAdminReportArgs {
  @TypeGraphQL.Field(_type => AdminReportWhereInput, {
    nullable: true
  })
  where?: AdminReportWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AdminReportOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: AdminReportOrderByWithRelationAndSearchRelevanceInput[] | undefined;

  @TypeGraphQL.Field(_type => AdminReportWhereUniqueInput, {
    nullable: true
  })
  cursor?: AdminReportWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [AdminReportScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "title" | "content" | "authorId" | "createdAt" | "updatedAt"> | undefined;
}
