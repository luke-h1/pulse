import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByContentBlockImageArgs } from "./args/GroupByContentBlockImageArgs";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { ContentBlockImageGroupBy } from "../../outputs/ContentBlockImageGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class GroupByContentBlockImageResolver {
  @TypeGraphQL.Query(_returns => [ContentBlockImageGroupBy], {
    nullable: false
  })
  async groupByContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByContentBlockImageArgs): Promise<ContentBlockImageGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
