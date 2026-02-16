export type SymbolString = Uppercase<string> & Lowercase<string>;
// this doesn't work, thanks TypeScript
// type NonSymbolString = Exclude<string, SymbolString>;

/**
  * replaces all uppercase character `C` with `_c`
  */
export type CamelToSnakeCasing<S extends string>
    = S extends `${infer Head}${infer Rest}`
    ? `${Head extends SymbolString ? Head : Head extends Uppercase<string> ? `_${Lowercase<Head>}` : Head}${CamelToSnakeCasing<Rest>}`
    : S;

/**
  * replaces all uppercase character `C` with `_c`
  */
export function camelToSnakeCasing<S extends string>(s: S): CamelToSnakeCasing<S> {
    const n = s.length;
    let s_ = '';
    for (let i = 0; i < n; ++i) {
        // @ts-expect-error
        s_ += 'A' <= s[i] && s[i] <= 'Z' ? `_${s[i].toLowerCase()}` : s[i];
    } 
    return s_ as CamelToSnakeCasing<S>;
}

/**
  * replaces all `_c` to `C`
  */
export type SnakeToCamelCasing<S extends string>
    = S extends `${infer First}${infer Second}${infer Rest}`
    ? First extends '_' ? Uppercase<Second> : `${First}${SnakeToCamelCasing<`${Second}${Rest}`>}`
    : S;

/**
  * replaces all `_c` to `C`
  * note: doesn't check for edge cases
  * `__` won't get handled correctly
  * and will ERROR when the string ends with `_`
  * @argument {S} s input string
  * @returns {SnakeToCamelCasing<S>} the input string after replacing all `_c` to `C`
  * @throws {TypeError} when the string ends with `_`
  */
export function snakeToCamelCasing<S extends string>(s: S): SnakeToCamelCasing<S> {
    const n = s.length;
    let s_ = '';
    for (let i = 0; i < n; ++i) {
        // @ts-expect-error
        s_ += s[i] == '_' ? s[++i].toUpperCase() : s[i];
    }
    return s_ as SnakeToCamelCasing<S>;
}


/**
  * Tries to "evaluate" the type.
  * ```
  * interface A {
  *     a: string;
  * }
  *
  * interface B {
  *     b: number;
  * }
  * 
  * // A | B
  * type C = A | B;
  *
  * // { a: string } | { b: number }
  * type D = Eval<A | B>;
  * ```
  */
export type Eval<T> = {
    [K in keyof T]: T[K];
} & {};
