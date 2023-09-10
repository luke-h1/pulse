import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { ProjectOrderByWithRelationAndSearchRelevanceInput } from '../../../inputs/ProjectOrderByWithRelationAndSearchRelevanceInput';
import { ProjectWhereInput } from '../../../inputs/ProjectWhereInput';
import { ProjectWhereUniqueInput } from '../../../inputs/ProjectWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateProjectArgs {
  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true,
  })
  where?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(
    _type => [ProjectOrderByWithRelationAndSearchRelevanceInput],
    {
      nullable: true,
    },
  )
  orderBy?: ProjectOrderByWithRelationAndSearchRelevanceInput[] | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: true,
  })
  cursor?: ProjectWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
