import { InputType } from 'type-graphql';
import { PostCreateInput } from './postCreateInput';

@InputType()
export class PostUpdateInput extends PostCreateInput {}
