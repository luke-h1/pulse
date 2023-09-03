import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateContentBlockImageArgs } from "./args/AggregateContentBlockImageArgs";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { AggregateContentBlockImage } from "../../outputs/AggregateContentBlockImage";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class AggregateContentBlockImageResolver {
  @TypeGraphQL.Query(_returns => AggregateContentBlockImage, {
    nullable: false
  })
  async aggregateContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateContentBlockImageArgs): Promise<AggregateContentBlockImage> {
    return getPrismaFromContext(ctx).contentBlockImage.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
