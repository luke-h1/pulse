import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { Post } from "../../../models/Post";
import { User } from "../../../models/User";
import { PostContentBlockImageArgs } from "./args/PostContentBlockImageArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Post)
export class PostRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [ContentBlockImage], {
    nullable: false
  })
  async ContentBlockImage(@TypeGraphQL.Root() post: Post, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: PostContentBlockImageArgs): Promise<ContentBlockImage[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.findUniqueOrThrow({
      where: {
        id: post.id,
      },
    }).ContentBlockImage({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async author(@TypeGraphQL.Root() post: Post, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo): Promise<User> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.findUniqueOrThrow({
      where: {
        id: post.id,
      },
    }).author({
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
