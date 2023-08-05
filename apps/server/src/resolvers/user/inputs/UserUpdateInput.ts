import { Field, InputType } from 'type-graphql';

@InputType()
export class UserUpdateInput {
  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  github: string;

  @Field(() => String, {
    nullable: true,
  })
  website: string;

  @Field(() => String, {
    nullable: true,
  })
  twitter: string;

  @Field(() => String, {
    nullable: true,
  })
  location: string;
}
