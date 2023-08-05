import { Field, InputType } from 'type-graphql';
import { Tag } from '../../../prisma/generated/type-graphql';

@InputType()
export class ProjectCreateInput {
  @Field()
  title: string;

  @Field()
  intro: string;

  @Field({
    nullable: true,
  })
  image?: string;

  @Field(() => String)
  content: string;

  @Field(() => String, {
    nullable: true,
  })
  appStoreUrl?: string;

  @Field(() => String, {
    nullable: true,
  })
  playStoreUrl?: string;

  @Field(() => String, {
    nullable: true,
  })
  githubUrl?: string;

  @Field(() => String, {
    nullable: true,
  })
  siteUrl?: string;

  @Field(() => [Tag])
  tags: Tag[];
}
