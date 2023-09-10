import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { ProjectWhereUniqueInput } from '../../../inputs/ProjectWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueProjectOrThrowArgs {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: false,
  })
  where!: ProjectWhereUniqueInput;
}
