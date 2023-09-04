import { Field, InputType } from 'type-graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { Status } from '../../../prisma/generated/type-graphql';

@InputType()
export class PostCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  intro: string;

  @Field()
  image: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => GraphQLJSON)
  content: typeof GraphQLJSON;

  @Field(() => Status)
  status: Status;
}
