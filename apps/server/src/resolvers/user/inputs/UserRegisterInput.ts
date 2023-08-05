import { Field, InputType } from 'type-graphql';
import { UserLoginInput } from './UserLoginInput';

@InputType()
export class UserRegisterInput extends UserLoginInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  username: string;
}
