/**
 * Get the type of an array element
 * @example
 * type T0 = ArrayElementType<string[]>; // string
 *
 */

export type ArrayElementType<T> = T extends (infer U)[] ? U : never;
