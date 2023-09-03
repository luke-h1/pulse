import { Field, InputType } from 'type-graphql';
import { GraphQLJSON } from 'graphql-scalars';

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
}
