import { Field, InputType } from 'type-graphql';

@InputType()
export class UserUpdateInput {
  @Field({
    nullable: true,
  })
  image: string;

  @Field({
    nullable: true,
  })
  github: string;

  @Field({
    nullable: true,
  })
  website: string;

  @Field({
    nullable: true,
  })
  twitter: string;

  @Field({
    nullable: true,
  })
  location: string;
}
