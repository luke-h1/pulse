type Func<T extends unknown[], R> = (...args: T) => R;

export type MaybeFunc<T extends unknown[], R> = R | Func<T, R>;

export function maybeCall<T extends unknown[], R>(
  maybeFunc: MaybeFunc<T, R>,
  ...args: T
) {
  if (typeof maybeFunc === 'function') {
    return (maybeFunc as Func<T, R>)(...args);
  }
  return maybeFunc;
}
