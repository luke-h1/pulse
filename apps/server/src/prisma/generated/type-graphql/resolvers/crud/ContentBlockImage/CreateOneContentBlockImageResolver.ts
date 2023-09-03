import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOneContentBlockImageArgs } from "./args/CreateOneContentBlockImageArgs";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class CreateOneContentBlockImageResolver {
  @TypeGraphQL.Mutation(_returns => ContentBlockImage, {
    nullable: false
  })
  async createOneContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOneContentBlockImageArgs): Promise<ContentBlockImage> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
