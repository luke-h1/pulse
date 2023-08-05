import { InputType } from 'type-graphql';
import { PostCreateInput } from './postCreateInput';

@InputType({
  description: 'Post update input data',
  isAbstract: true,
})
export class PostUpdateInput extends PostCreateInput {}
