import { Field, InputType } from 'type-graphql';

@InputType()
export class ProjectCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  intro: string;

  @Field(() => String, {
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

  @Field(() => [String])
  tags: string[];
}
