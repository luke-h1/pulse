import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String)
  hello() {
    return 'OK!';
  }
}
