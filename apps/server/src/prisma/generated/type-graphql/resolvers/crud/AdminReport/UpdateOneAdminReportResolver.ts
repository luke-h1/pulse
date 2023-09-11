import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateOneAdminReportArgs } from "./args/UpdateOneAdminReportArgs";
import { AdminReport } from "../../../models/AdminReport";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AdminReport)
export class UpdateOneAdminReportResolver {
  @TypeGraphQL.Mutation(_returns => AdminReport, {
    nullable: true
  })
  async updateOneAdminReport(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneAdminReportArgs): Promise<AdminReport | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).adminReport.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
