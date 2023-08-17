import { Field, InputType } from 'type-graphql';

@InputType()
export class OrderInput {
  @Field(() => String, { nullable: true })
  orderBy?: string;

  @Field(() => String, { nullable: true })
  orderDirection?: string;
}
