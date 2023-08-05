import { Field, InputType } from 'type-graphql';
import { Tag } from '../../../prisma/generated/type-graphql';

@InputType()
export class PostCreateInput {
  @Field()
  title: string;

  @Field()
  intro: string;

  @Field({
    nullable: true,
  })
  image?: string;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => String)
  content: string;
}
