/**
 * Represents an object with string keys
 */
type KeyedObject = {
    [key: string]: any
}

/**
 * Asserts the discrimination key `K` of a discriminated union `T` to the given value `V`
 */
type AssertDiscriminatedUnion<T extends KeyedObject, K extends keyof KeyedObject, V extends T[K]>
    = T extends { [P in K]: V } ? T : never;

/**
 * Inserts properties of record `V` into key `K` of type `T`, where `T[K]` is another record
 */
type Insert<T, K extends keyof T, V extends KeyedObject> = T[K] extends KeyedObject 
    ? Omit<T, K> & { [P in K]: T[K] & V } 
    : never;

/**
 * Makes all properties in `T` partial except for those in `K`
 */
type PartialExcept<T, K extends keyof T> = {
    [P in keyof T as P extends K ? P : never]: T[P];
} & Partial<Pick<T, Exclude<keyof T, K>>>;

/**
 * Returns the string values of an enum
 */
type EnumValues<T extends KeyedObject> = 
    | T[keyof T] 
    | `${T[keyof T]}`;

/**
 * Returns a boolean value indicating whether `K` is a key of type `T`
 */
type HasDefinedKV<T, K extends keyof T, V extends T[K]> = K extends keyof T 
    ? T[K] extends V ? true : false
    : false;

/**
 * Returns if an array `T` of objects contains any element that matches object `O` 
 */
type HasObjectWithKVRecord<T extends readonly object[], K extends PropertyKey, V> = true extends (
    T[number] extends infer A 
        ? A extends A
            ? A extends Record<K, V>
                ? true
                : never
            : never
        : never
) ? true : false;

export { AssertDiscriminatedUnion, EnumValues, HasDefinedKV, HasObjectWithKVRecord, Insert, KeyedObject, PartialExcept };
