import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateOneContentBlockImageArgs } from "./args/UpdateOneContentBlockImageArgs";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class UpdateOneContentBlockImageResolver {
  @TypeGraphQL.Mutation(_returns => ContentBlockImage, {
    nullable: true
  })
  async updateOneContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneContentBlockImageArgs): Promise<ContentBlockImage | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
