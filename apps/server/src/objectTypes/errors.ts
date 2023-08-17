import { Field, ObjectType } from 'type-graphql';
import { FieldError } from '../utils/FieldError';

@ObjectType()
export class ErrorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
