import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstContentBlockImageArgs } from "./args/FindFirstContentBlockImageArgs";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class FindFirstContentBlockImageResolver {
  @TypeGraphQL.Query(_returns => ContentBlockImage, {
    nullable: true
  })
  async findFirstContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstContentBlockImageArgs): Promise<ContentBlockImage | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
