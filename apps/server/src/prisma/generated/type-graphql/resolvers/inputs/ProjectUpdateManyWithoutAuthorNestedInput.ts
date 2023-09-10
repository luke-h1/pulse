import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { ProjectCreateManyAuthorInputEnvelope } from '../inputs/ProjectCreateManyAuthorInputEnvelope';
import { ProjectCreateOrConnectWithoutAuthorInput } from '../inputs/ProjectCreateOrConnectWithoutAuthorInput';
import { ProjectCreateWithoutAuthorInput } from '../inputs/ProjectCreateWithoutAuthorInput';
import { ProjectScalarWhereInput } from '../inputs/ProjectScalarWhereInput';
import { ProjectUpdateManyWithWhereWithoutAuthorInput } from '../inputs/ProjectUpdateManyWithWhereWithoutAuthorInput';
import { ProjectUpdateWithWhereUniqueWithoutAuthorInput } from '../inputs/ProjectUpdateWithWhereUniqueWithoutAuthorInput';
import { ProjectUpsertWithWhereUniqueWithoutAuthorInput } from '../inputs/ProjectUpsertWithWhereUniqueWithoutAuthorInput';
import { ProjectWhereUniqueInput } from '../inputs/ProjectWhereUniqueInput';

@TypeGraphQL.InputType('ProjectUpdateManyWithoutAuthorNestedInput', {})
export class ProjectUpdateManyWithoutAuthorNestedInput {
  @TypeGraphQL.Field(_type => [ProjectCreateWithoutAuthorInput], {
    nullable: true,
  })
  create?: ProjectCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectCreateOrConnectWithoutAuthorInput], {
    nullable: true,
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(
    _type => [ProjectUpsertWithWhereUniqueWithoutAuthorInput],
    {
      nullable: true,
    },
  )
  upsert?: ProjectUpsertWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateManyAuthorInputEnvelope, {
    nullable: true,
  })
  createMany?: ProjectCreateManyAuthorInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
  })
  set?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
  })
  delete?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
  })
  connect?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    _type => [ProjectUpdateWithWhereUniqueWithoutAuthorInput],
    {
      nullable: true,
    },
  )
  update?: ProjectUpdateWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectUpdateManyWithWhereWithoutAuthorInput], {
    nullable: true,
  })
  updateMany?: ProjectUpdateManyWithWhereWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: ProjectScalarWhereInput[] | undefined;
}
