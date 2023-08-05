import { Field, InputType } from 'type-graphql';
import { UserLoginInput } from './UserLoginInput';

@InputType()
export class UserRegisterInput extends UserLoginInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;
}
