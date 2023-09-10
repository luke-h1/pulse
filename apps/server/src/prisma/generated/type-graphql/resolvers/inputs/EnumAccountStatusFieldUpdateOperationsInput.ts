import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { AccountStatus } from '../../enums/AccountStatus';

@TypeGraphQL.InputType('EnumAccountStatusFieldUpdateOperationsInput', {})
export class EnumAccountStatusFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => AccountStatus, {
    nullable: true,
  })
  set?: 'BANNED' | 'ON_HOLD' | 'ACTIVE' | undefined;
}
