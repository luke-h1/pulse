import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneContentBlockImageArgs } from "./args/UpsertOneContentBlockImageArgs";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class UpsertOneContentBlockImageResolver {
  @TypeGraphQL.Mutation(_returns => ContentBlockImage, {
    nullable: false
  })
  async upsertOneContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneContentBlockImageArgs): Promise<ContentBlockImage> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
