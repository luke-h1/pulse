import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindManyContentBlockImageArgs } from "./args/FindManyContentBlockImageArgs";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class FindManyContentBlockImageResolver {
  @TypeGraphQL.Query(_returns => [ContentBlockImage], {
    nullable: false
  })
  async contentBlockImages(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyContentBlockImageArgs): Promise<ContentBlockImage[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
