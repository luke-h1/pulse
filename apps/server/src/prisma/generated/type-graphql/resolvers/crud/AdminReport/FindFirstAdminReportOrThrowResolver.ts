import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstAdminReportOrThrowArgs } from "./args/FindFirstAdminReportOrThrowArgs";
import { AdminReport } from "../../../models/AdminReport";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AdminReport)
export class FindFirstAdminReportOrThrowResolver {
  @TypeGraphQL.Query(_returns => AdminReport, {
    nullable: true
  })
  async findFirstAdminReportOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstAdminReportOrThrowArgs): Promise<AdminReport | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).adminReport.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
