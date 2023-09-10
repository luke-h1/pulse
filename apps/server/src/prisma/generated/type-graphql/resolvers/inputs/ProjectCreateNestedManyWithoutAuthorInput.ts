import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { ProjectCreateManyAuthorInputEnvelope } from '../inputs/ProjectCreateManyAuthorInputEnvelope';
import { ProjectCreateOrConnectWithoutAuthorInput } from '../inputs/ProjectCreateOrConnectWithoutAuthorInput';
import { ProjectCreateWithoutAuthorInput } from '../inputs/ProjectCreateWithoutAuthorInput';
import { ProjectWhereUniqueInput } from '../inputs/ProjectWhereUniqueInput';

@TypeGraphQL.InputType('ProjectCreateNestedManyWithoutAuthorInput', {})
export class ProjectCreateNestedManyWithoutAuthorInput {
  @TypeGraphQL.Field(_type => [ProjectCreateWithoutAuthorInput], {
    nullable: true,
  })
  create?: ProjectCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectCreateOrConnectWithoutAuthorInput], {
    nullable: true,
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateManyAuthorInputEnvelope, {
    nullable: true,
  })
  createMany?: ProjectCreateManyAuthorInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
  })
  connect?: ProjectWhereUniqueInput[] | undefined;
}
