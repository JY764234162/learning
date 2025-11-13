/**
 * 将对象中所有属性名转换为大写字母
 * @template T - 输入的对象类型
 * @example
 * type Input = { name: string, age: number };
 * type Output = UppercaseObj<Input>; // { NAME: string, AGE: number }
 */
type UppercaseObj<T extends object> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

/**
 * 将对象中所有属性名转换为小写字母
 * @template T - 输入的对象类型
 * @example
 * type Input = { NAME: string, AGE: number };
 * type Output = LowercaseObj<Input>; // { name: string, age: number }
 */
type LowercaseObj<T extends object> = {
  [K in keyof T as Lowercase<K & string>]: T[K];
};

/**
 * 将字符串的首字母转换为大写
 * @template T - 输入的字符串类型
 * @example
 * type Output = CapitalizeString<'hello'>; // 'Hello'
 */
type CapitalizeString<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${Lowercase<R>}`
  : T;

/**
 * 将对象中所有属性名的首字母转换为大写
 * @template T - 输入的对象类型
 * @example
 * type Input = { name: string, age: number };
 * type Output = CapitalizeObj<Input>; // { Name: string, Age: number }
 */
type CapitalizeObj<T extends object> = {
  [K in keyof T as CapitalizeString<K & string>]: T[K];
};

/**
 * 将字符串转换为首字母小写，其余字母大写的格式
 * @template T - 输入的字符串类型
 * @example
 * type Output = UnCapitalizeString<'Hello'>; // 'hELLO'
 * type Output2 = UnCapitalizeString<'WORLD'>; // 'wORLD'
 */
type UnCapitalizeString<T extends string> = T extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${Uppercase<R>}`
  : T;

/**
 * 将对象中所有属性名转换为首字母小写，其余字母大写的格式
 * @template T - 输入的对象类型
 * @example
 * type Input = { Name: string, Age: number };
 * type Output = UnCapitalizeObj<Input>; // { nAME: string, aGE: number }
 */
type UnCapitalizeObj<T extends object> = {
  [K in keyof T as UnCapitalizeString<K & string>]: T[K];
};

/**
 * 从对象类型中排除指定的属性，类似于 Omit 工具类型
 * @template T - 输入的对象类型
 * @template E - 要排除的属性键
 * @example
 * type Input = { name: string, age: number, address: string };
 * type Output = MyOmit<Input, 'age'>; // { name: string, address: string }
 */
type MyOmit<T extends object, E extends keyof T> = {
  [K in keyof T as K extends E ? never : K]: T[K];
};

/**
 * 判断两个类型是否相等的工具类型
 * @template X - 第一个比较类型
 * @template Y - 第二个比较类型
 * @template A - 类型相等时返回的类型
 * @template B - 类型不相等时返回的类型
 * @example
 * type Result = IfEquals<string, string, true, false>; // true
 */
type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/**
 * 从对象类型中提取所有只读属性
 * @template T - 输入的对象类型
 * @example
 * type Input = { readonly name: string, age: number };
 * type Output = PickReadonly<Input>; // { readonly name: string }
 */
type PickReadonly<T extends object> = {
  [K in keyof T as K extends IfEquals<
    { [P in K]: T[P] },
    { readonly [P in K]: T[P] },
    K
  >
    ? K
    : never]: T[K];
};

/**
 * 从对象类型中提取所有非只读属性
 * @template T - 输入的对象类型
 * @example
 * type Input = { readonly name: string, age: number };
 * type Output = PickUnReadonly<Input>; // { age: number }
 */
type PickUnReadonly<T extends object> = {
  [K in keyof T as K extends IfEquals<
    { [P in K]: T[P] },
    { -readonly [P in K]: T[P] },
    K
  >
    ? K
    : never]: T[K];
};

/**
 * 从对象类型中提取所有可选属性
 * @template T - 输入的对象类型
 * @example
 * type Input = { name: string, age?: number };
 * type Output = PickPartial<Input>; // { age?: number }
 */
type PickPartial<T extends object> = {
  [K in keyof T as K extends IfEquals<
    { [P in K]: T[P] },
    { [P in K]?: T[P] },
    K
  >
    ? K
    : never]: T[K];
};

/**
 * 从对象类型中提取所有必需属性
 * @template T - 输入的对象类型
 * @example
 * type Input = { name: string, age?: number };
 * type Output = PickRequired<Input>; // { name: string }
 */
type PickRequired<T extends object> = {
  [K in keyof T as K extends IfEquals<
    { [P in K]: T[P] },
    { [P in K]-?: T[P] },
    K
  >
    ? K
    : never]: T[K];
};

/**
 * 从两个对象类型中提取出同时存在的属性
 * @template T - 第一个对象类型
 * @template U - 第二个对象类型
 * @example
 * type Output = Intersection<{ key1: number }, { key1: string }>; // {}  类型不一致
 * type Output2 = Intersection<{ key1: number }, { key1: number; key2: number }>; // { key1: number }
 */
type Intersection<T extends object, U extends object> = {
  [K in keyof T & keyof U as K extends IfEquals<
    { [P in K]: T[P] },
    { [P in K]: U[P] },
    K
  >
    ? K
    : never]: T[K];
};

/**
 * 合并两个对象类型，如果存在相同的属性，则以第二个对象的属性为准
 * @template T - 第一个对象类型
 * @template U - 第二个对象类型
 * @example
 * type Output = OverWrite<{ key1: number }, { key1: string; other: "other" }>; // { key1: string }
 */
type OverWrite<T extends object, U extends object> = {
  [K in keyof T & keyof U]: U[K];
};

/**
 * 将对象类型中的指定属性设置为可选属性
 * @template T - 输入的对象类型
 * @template U - 要设置为可选属性的键
 * @example
 * type Input = { a: number, b: string };
 * type Output = SetOptional<Input, 'a'>; // { a?: number, b: string }
 */
type SetOptional<T extends object, U extends keyof T> = {
  [K in U]?: T[K];
} & Omit<T, U>;

/**
 * 根据类型选择对象中的属性
 * @template T - 输入的对象类型
 * @template U - 要选择的属性类型
 * @example
 * type Input = { a: string, b: number, c: boolean };
 * type Output = PickByType<Input, boolean>; // { c: boolean }
 */
type PickByType<T extends object, U extends T[keyof T]> = {
  [K in keyof T as IfEquals<T[K], U, K, never>]: T[K];
};

/**
 * 添加一个参数到函数类型中
 * @template F - 输入的函数类型
 * @template A - 添加的参数类型
 * @example
 * type Fn = (a: number, b: string) => number | string;
 * type Output = AppendArgument<Fn, boolean>; // (x: boolean, a: number, b: string) => number | string
 */
type AppendArgument<F extends (...args: any[]) => any, A> = (
  x: A,
  ...args: Parameters<F>
) => ReturnType<F>;

/**
 * 扁平化数组
 * @template T - 输入的数组类型
 * @example
 * type Input = ["a", ["b", ["c", ["e"]]], ["d"]];
 * type Output = DeepFlat<Input>; // "a" | "b" | "c" | "e" | "d"
 * type Input2 = [1, [2, [3, [4, 1]]]];
 * type Output2 = DeepFlat<Input2>; // 1 | 2 | 3 | 4
 */

type DeepFlat<T> = T extends [infer First, ...infer Rest]
  ? DeepFlat<First> | DeepFlat<Rest>
  : T extends any[]
    ? DeepFlat<T[number]>
    : T;

/**
 * 将字符串数组拼接成一个字符串(递归)
 * @template Arr - 输入的字符串数组类型
 * @template Separator - 分隔符类型
 * @template Result - 结果类型
 * @example
 * type Names = ["Sem", "Lolo", "Kaquko"];
 * type NamesComma = JoinStrArray<Names, ",">; // "Sem,Lolo,Kaquko"
 */

type JoinStrArray<
  Arr extends string[],
  Separator extends string,
  Result extends string = "",
> = Arr extends [infer First extends string, ...infer Rest extends string[]]
  ? Result extends ""
    ? JoinStrArray<Rest, Separator, First>
    : JoinStrArray<Rest, Separator, `${Result}${Separator}${First}`>
  : Result;

/**
 * 将字符串用分隔符分割成数组(递归)
 * @template S - 输入的字符串类型
 * @template Separator - 分隔符类型
 * @example
 * type Names = "Sem,Lolo,Kaquko";
 * type NamesComma = SplitArrStr<Names, ",">; // ["Sem", "Lolo", "Kaquko"]
 */
type SplitArrString<
  S extends string,
  Separator extends string = "",
> = S extends `${infer First}${Separator}${infer Rest}`
  ? [First, ...SplitArrString<Rest, Separator>]
  : [S];

/**
 * 将字符串类型转换为联合类型
 * @template S - 输入的字符串类型
 * @example
 * type Input = "123";
 * type Output = StringToUnion<Input>; // "1" | "2" | "3"
 */
type StringToUnion<S extends string> = S extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never;

/**
 * 去掉字符串开头的空格(递归)
 * @template S - 输入的字符串类型
 * @example
 * type Input = "  Hello World";
 * type Output = TrimLeft<Input>; // "Hello World"
 */

type TrimLeft<S extends string> = S extends ` ${infer Rest}`
  ? TrimLeft<Rest>
  : S;

/**
 * 去掉字符串结尾的空格(递归)
 * @template S - 输入的字符串类型
 * @example
 * type Input = "Hello World  ";
 * type Output = TrimRight<Input>; // "Hello World"
 */

type TrimRight<S extends string> = S extends `${infer Rest} `
  ? TrimRight<Rest>
  : S;

/**
 * 将联合类型转换为交叉类型（利用分发特性将联合类型转化为交叉类型）
 * @template U - 输入的联合类型
 * @example
 * type Input = "1" | "2" | "3";
 * type Output = UnionToIntersection<Input>; // never
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * 至少选择一个属性(其他属性保持不变)
 * @template ObjectType - 输入的对象类型
 * @template KeysType - 需要选择的属性键类型
 * @example
 * type Input = { a: string; b: string; c: string };
 * type Output = RequireAtLeastOne<Input, 'a' | 'b'>; // { a: string,c: string } | { b: string,c: string}
 */
type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = { [K in KeysType]: Pick<ObjectType, K> }[KeysType] &
  Omit<ObjectType, KeysType>;

/**
 * 判断类型是否为never
 * @template T - 输入的类型
 * @example
 * type Input = never;
 * type Output = IsNever<Input>; // true
 */
type IsNever<T> = [T] extends [never] ? true : false;

/**
 * 将数组类型转换为逆序类型
 * @template Arr - 输入的数组类型
 * @example
 * type Input = [1, 2, 3];
 * type Output = Reserve<Input>; // [3, 2, 1]
 */

type Reserve<Arr extends any[]> = Arr extends [infer First, ...infer Rest]
  ? [...Reserve<Rest>, First]
  : [];

/**
 * 链式调用
 * @template T - 输入的对象类型
 * @example
 * type ResultType = typeof result;
 * 期望 ResultType 的类型是：
 * {
 *   age: number
 *   name: string
 *   address: {
 *     value: string
 *   }
 * }
 */
type Chainable<T extends Record<string, any> = object> = {
  option<K extends string, V>(key: K, value: V): Chainable<T & { [P in K]: V }>;
  get(): T;
};
