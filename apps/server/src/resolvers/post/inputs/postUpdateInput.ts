import { Field, InputType } from 'type-graphql';
import { Status } from '../../../prisma/generated/type-graphql';
import { PostCreateInput } from './postCreateInput';

@InputType()
export class PostUpdateInput extends PostCreateInput {
  @Field(() => Status)
  status: Status;
}
