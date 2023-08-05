import { Field, InputType } from 'type-graphql';

@InputType()
export class PostCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  intro: string;

  @Field({
    nullable: true,
  })
  image?: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => String)
  content: string;
}
