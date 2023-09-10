import { Field, InputType } from 'type-graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { Status } from '../../../prisma/generated/type-graphql';

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

  @Field(() => GraphQLJSON)
  content: typeof GraphQLJSON;

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

  @Field(() => Status)
  status: Status;
}
