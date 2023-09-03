import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { Post } from "../../../models/Post";
import { Project } from "../../../models/Project";
import { ContentBlockImageProjectArgs } from "./args/ContentBlockImageProjectArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class ContentBlockImageRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Post, {
    nullable: false
  })
  async post(@TypeGraphQL.Root() contentBlockImage: ContentBlockImage, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo): Promise<Post> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.findUniqueOrThrow({
      where: {
        id: contentBlockImage.id,
      },
    }).post({
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.FieldResolver(_type => Project, {
    nullable: true
  })
  async project(@TypeGraphQL.Root() contentBlockImage: ContentBlockImage, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: ContentBlockImageProjectArgs): Promise<Project | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.findUniqueOrThrow({
      where: {
        id: contentBlockImage.id,
      },
    }).project({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
