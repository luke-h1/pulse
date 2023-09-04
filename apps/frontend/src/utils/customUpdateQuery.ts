import { Cache, QueryInput } from '@urql/exchange-graphcache';

export default function CustomUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any,
  updateFunction: (result: Result, query: Query) => Query,
): void {
  return cache.updateQuery(
    queryInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data => updateFunction(result, data as unknown as any) as any,
  );
}
