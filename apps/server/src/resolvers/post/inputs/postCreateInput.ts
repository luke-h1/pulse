import { Tag } from 'apps/server/src/prisma/src/generated/type-graphql';
import { Field, InputType } from 'type-graphql';

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
