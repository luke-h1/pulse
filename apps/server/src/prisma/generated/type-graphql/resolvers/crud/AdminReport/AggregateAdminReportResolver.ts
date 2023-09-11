import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateAdminReportArgs } from "./args/AggregateAdminReportArgs";
import { AdminReport } from "../../../models/AdminReport";
import { AggregateAdminReport } from "../../outputs/AggregateAdminReport";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AdminReport)
export class AggregateAdminReportResolver {
  @TypeGraphQL.Query(_returns => AggregateAdminReport, {
    nullable: false
  })
  async aggregateAdminReport(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateAdminReportArgs): Promise<AggregateAdminReport> {
    return getPrismaFromContext(ctx).adminReport.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
