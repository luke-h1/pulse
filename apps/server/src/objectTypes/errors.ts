import { Field, ObjectType } from 'type-graphql';
import { FieldError } from '../fields/FieldError';

@ObjectType()
export class ErrorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
