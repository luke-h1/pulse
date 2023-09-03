import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateContentBlockImageArgs } from "./args/AggregateContentBlockImageArgs";
import { CreateManyContentBlockImageArgs } from "./args/CreateManyContentBlockImageArgs";
import { CreateOneContentBlockImageArgs } from "./args/CreateOneContentBlockImageArgs";
import { DeleteManyContentBlockImageArgs } from "./args/DeleteManyContentBlockImageArgs";
import { DeleteOneContentBlockImageArgs } from "./args/DeleteOneContentBlockImageArgs";
import { FindFirstContentBlockImageArgs } from "./args/FindFirstContentBlockImageArgs";
import { FindFirstContentBlockImageOrThrowArgs } from "./args/FindFirstContentBlockImageOrThrowArgs";
import { FindManyContentBlockImageArgs } from "./args/FindManyContentBlockImageArgs";
import { FindUniqueContentBlockImageArgs } from "./args/FindUniqueContentBlockImageArgs";
import { FindUniqueContentBlockImageOrThrowArgs } from "./args/FindUniqueContentBlockImageOrThrowArgs";
import { GroupByContentBlockImageArgs } from "./args/GroupByContentBlockImageArgs";
import { UpdateManyContentBlockImageArgs } from "./args/UpdateManyContentBlockImageArgs";
import { UpdateOneContentBlockImageArgs } from "./args/UpdateOneContentBlockImageArgs";
import { UpsertOneContentBlockImageArgs } from "./args/UpsertOneContentBlockImageArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { ContentBlockImage } from "../../../models/ContentBlockImage";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateContentBlockImage } from "../../outputs/AggregateContentBlockImage";
import { ContentBlockImageGroupBy } from "../../outputs/ContentBlockImageGroupBy";

@TypeGraphQL.Resolver(_of => ContentBlockImage)
export class ContentBlockImageCrudResolver {
  @TypeGraphQL.Query(_returns => AggregateContentBlockImage, {
    nullable: false
  })
  async aggregateContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateContentBlockImageArgs): Promise<AggregateContentBlockImage> {
    return getPrismaFromContext(ctx).contentBlockImage.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async createManyContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyContentBlockImageArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyContentBlockImageArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => ContentBlockImage, {
    nullable: true
  })
  async deleteOneContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOneContentBlockImageArgs): Promise<ContentBlockImage | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query(_returns => ContentBlockImage, {
    nullable: true
  })
  async findFirstContentBlockImageOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstContentBlockImageOrThrowArgs): Promise<ContentBlockImage | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query(_returns => ContentBlockImage, {
    nullable: true
  })
  async contentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueContentBlockImageArgs): Promise<ContentBlockImage | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => ContentBlockImage, {
    nullable: true
  })
  async getContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueContentBlockImageOrThrowArgs): Promise<ContentBlockImage | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyContentBlockImage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyContentBlockImageArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).contentBlockImage.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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
