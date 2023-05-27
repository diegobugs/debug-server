type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

export type ParseToCamelCase<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: T[K]
    }
  : T

export type ParseToSnakeCase<T> = T extends object
  ? {
      [K in keyof T as CamelToSnakeCase<K & string>]: T[K]
    }
  : T

export type valueOf<T> = T[keyof T]
