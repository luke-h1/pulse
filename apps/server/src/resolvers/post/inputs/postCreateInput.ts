import { Field, InputType } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload-minimal';

@InputType()
export class PostCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  intro: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image: FileUpload;

  @Field(() => [String])
  tags: string[];

  @Field(() => String)
  content: string;
}
