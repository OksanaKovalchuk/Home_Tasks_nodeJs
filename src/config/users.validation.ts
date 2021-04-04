import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { ERROR_MESSAGES_MAPPED }  from './constants';

/**
 * User Schema declaration
 */
const properties = {
    login: {
        type: 'string',
        // pattern: '([a-zA-Z].*)([0-9].*)'
        pattern: '^[a-zA-Z]\\w{3,14}$'
    },
    password: {
        type: 'string',
        // pattern: '[a-zA-Z]+\d'
        // pattern: '(?=.*?[0-9])(?=.*?[A-Za-z]).+'
        pattern: '^(?=.*\\d)(?=.*[a-zA-Z])(?!.*\\s).{2,100}$'
    },
    age: {
        type: 'number',
        minimum: 4,
        maximum: 130
    },
    isDeleted: {
        type: 'boolean'
    },
};

export const userSchema = {
    properties,
    required:
        ['login', 'password', 'age'],
}


/**
 * Compiling during initialization
 */
const ajv = new Ajv();

export const userValidate = ajv.compile(userSchema)
export const userUpdateValidate = ajv.compile({ properties })

/**
 * Create error response parsing
 */
export function errorResponse(schemaErrors: ErrorObject[]) {
    const errors = schemaErrors.map(error => {
        const { dataPath, message, params } = error;
        const field = dataPath.split('/')[1];

        if (params.pattern && Object.keys(ERROR_MESSAGES_MAPPED).includes(field)) {
            // @ts-ignore
            const updatedMessage: string = ERROR_MESSAGES_MAPPED[field] || message ;
            return {
                field,
                message: updatedMessage,
            };
        }

        return { field, message };
    });

    return {
        status: '400',
        ...errors
    }
}


/**
 * Create validation middleware
 */
export const validate = (method: ValidateFunction<unknown>) => {
    return (req: { body: any; }, res: any, next: () => void) => {
        const isValid = method(req.body);

        if (!isValid) {
            res.status(400).json(errorResponse(method.errors));
        } else {
            next();
        }
    }
}
export const validationSchema = (method:string = 'create') =>
    validate(method === 'create' ? userValidate: userUpdateValidate);
