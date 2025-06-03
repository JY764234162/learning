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
type UnCapitalizeObj<T extends Object> = {
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
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

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
