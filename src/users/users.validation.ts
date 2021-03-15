import Ajv from "ajv";

/**
 * User Schema declaration
 */
export const userSchema = {
    properties: {
        login: {
            type: 'string'
        },
        password: {
            type: 'string',
            // pattern: '[a-zA-Z]+\d'
        },
        age: {
            type: 'number',
            minimum: 4,
            maximum: 130
        },
        isDeleted: {
            type: 'boolean'
        },
    },
    required:
        ['login', 'password', 'age'],
}


/**
 * Compiling during initialization
 */
const ajv = new Ajv();

export const userValidate = ajv.compile(userSchema)

/**
 * Create error response parsing
 */
export function errorResponse(schemaErrors: any[]) {
    const errors = schemaErrors.map(error => {
        const { dataPath, message } = error;
        return { field: dataPath.split('/')[1], message };
    });

    return {
        status: '400',
        ...errors
    }
}


/**
 * Create validation middleware
 */
export const validationSchema = () => {
    return (req: { body: any; }, res: { status: (arg0: number) => { json: (arg0: {
                [p: number]: { field: any; message: any }; some(predicate: (value: { field: any; message: any }, index: number, array: { field: any; message: any }[]) => unknown, thisArg?: any): boolean; keys(): IterableIterator<number>; shift(): ({ field: any; message: any } | undefined); values(): IterableIterator<{ field: any; message: any }>; pop(): ({ field: any; message: any } | undefined); slice(start?: number, end?: number): { field: any; message: any }[]; find: { <S extends { field: any; message: any }>(predicate: (this: void, value: { field: any; message: any }, index: number, obj: { field: any; message: any }[]) => value is S, thisArg?: any): (S | undefined); (predicate: (value: { field: any; message: any }, index: number, obj: { field: any; message: any }[]) => unknown, thisArg?: any): ({ field: any; message: any } | undefined) }; join(separator?: string): string; reduceRight: { (callbackfn: (previousValue: { field: any; message: any }, currentValue: { field: any; message: any }, currentIndex: number, array: { field: any; message: any }[]) => { field: any; message: any }): { field: any; message: any }; (callbackfn: (previousValue: { field: any; message: any }, currentValue: { field: any; message: any }, currentIndex: number, array: { field: any; message: any }[]) => { field: any; message: any }, initialValue: { field: any; message: any }): { field: any; message: any }; <U>(callbackfn: (previousValue: U, currentValue: { field: any; message: any }, currentIndex: number, array: { field: any; message: any }[]) => U, initialValue: U): U }; copyWithin(target: number, start: number, end?: number): this; indexOf(searchElement: { field: any; message: any }, fromIndex?: number): number; every: { <S extends { field: any; message: any }>(predicate: (value: { field: any; message: any }, index: number, array: { field: any; message: any }[]) => value is S, thisArg?: any): this is S[]; (predicate: (value: { field: any; message: any }, index: number, array: { field: any; message: any }[]) => unknown, thisArg?: any): boolean }; map<U>(callbackfn: (value: { field: any; message: any }, index: number, array: { field: any; message: any }[]) => U, thisArg?: any): U[]; reduce: { (callbackfn: (previousValue: { field: any; message: any }, currentValue: { field: any; message: any }, currentIndex: number, array: { field: any; message: any }[]) => { field: any; message: any }): { field: any; message: any }; (callbackfn: (previousValue: { field: any; message: any }, currentValue: { field: any; message: any }, currentIndex: number, array: { field: any; message: any }[]) => { field: any; message: any }, initialValue: { field: any; message: any }): { field: any; message: any }; <U>(callbackfn: (previousValue: U, currentValue: { field: any; message: any }, currentIndex: number, array: { field: any; message: any }[]) => U, initialValue: U): U }; splice: { (start: number, deleteCount?: number): { field: any; message: any }[]; (start: number, deleteCount: number, ...items: { field: any; message: any }[]): { field: any; message: any }[] }; forEach(callbackfn: (value: { field: any; message: any }, index: number, array: { field: any; message: any }[]) => void, thisArg?: any): void; [Symbol.iterator](): IterableIterator<{ field: any; message: any }>; length: number; concat: { (...items: ConcatArray<{ field: any; message: any }>): { field: any; message: any }[]; (...items: ConcatArray<{ field: any; message: any }> | { field: any; message: any }[]): { field: any; message: any }[] }; sort(compareFn?: (a: { field: any; message: any }, b: { field: any; message: any }) => number): this; reverse(): { field: any; message: any }[]; fill(value: { field: any; message: any }, start?: number, end?: number): this; push(...items: { field: any; message: any }[]): number; [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean }; filter: { <S extends { field: any; message: any }>(predicate: (value: { field: any; message: any }, index: number, array: { field: any; message: any }[]) => value is S, thisArg?: any): S[]; (predicate: (value: { field: any; message: any }, index: number, array: { field: any; message: any }[]) => unknown, thisArg?: any): { field: any; message: any }[] }; findIndex(predicate: (value: { field: any; message: any }, index: number, obj: { field: any; message: any }[]) => unknown, thisArg?: any): number; lastIndexOf(searchElement: { field: any; message: any }, fromIndex?: number): number; entries(): IterableIterator<[number, { field: any; message: any }]>; toString(): string; unshift(...items: { field: any; message: any }[]): number; status: string; toLocaleString(): string
            }) => void; }; }, next: () => void) => {
        const isValid = userValidate(req.body);

        if (!isValid) {
            res.status(400).json(errorResponse(userValidate.errors));
        } else {
            next();
        }
    }
}
