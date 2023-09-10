import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { Project } from '../../../models/Project';
import { User } from '../../../models/User';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver(_of => Project)
export class ProjectRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false,
  })
  async author(
    @TypeGraphQL.Root() project: Project,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .project.findUniqueOrThrow({
        where: {
          id: project.id,
        },
      })
      .author({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
