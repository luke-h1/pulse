import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByAdminReportArgs } from "./args/GroupByAdminReportArgs";
import { AdminReport } from "../../../models/AdminReport";
import { AdminReportGroupBy } from "../../outputs/AdminReportGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AdminReport)
export class GroupByAdminReportResolver {
  @TypeGraphQL.Query(_returns => [AdminReportGroupBy], {
    nullable: false
  })
  async groupByAdminReport(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByAdminReportArgs): Promise<AdminReportGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).adminReport.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
