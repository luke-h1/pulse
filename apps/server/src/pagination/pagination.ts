import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export default class Pagination {
  @Field(() => Number, { nullable: true })
  totalCount?: number;

  @Field(() => Boolean, { nullable: true })
  hasPreviousPage?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasNextPage?: boolean;
}

@InputType()
export class PaginationInput {
  @Field(() => Number, { nullable: true })
  first?: number;

  @Field(() => Number, { nullable: true })
  after?: number;
}
