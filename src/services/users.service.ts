/**
 * Data Model Interfaces
 */
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import { BaseUser, User } from '../models/user.interface';
import controller from '../routers/users.controller';
import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

/**
 * In-Memory Store
 */

const schema = {
    properties: {
        login: { type: 'string' },
        password: { type: 'string' },
        age: { type: 'number' },
        isDeleted: { type: 'boolean' },
    },
    optionalProperties: {
        bar: {type: "string"}
    }
}

// const ajv = new Ajv();
// const validate = ajv.compile(schema)

/**
 * Service Methods
 */

export const findAll = async (loginSubstring: string = '', limit: number = 0): Promise<User[]> => await controller.findAll(loginSubstring, limit);

export const find = async (id: number): Promise<User> => await controller.findOne(id);

export const create = async (newUser: BaseUser): Promise<User> => {
    // const valid = validate(newUser)
    // if (!valid) {
        // tslint:disable-next-line:no-console
        // console.log(validate.errors)
    // }
    return await controller.create(newUser, { fields: ['login', 'password', 'isDeleted'] });
};

export const update = async (
    id: number,
    userUpdate: BaseUser
): Promise<User | null> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    controller.update({ id, ...userUpdate });
};

export const remove = async (id: number): Promise<User> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    controller.deleteUser({ id, ...user });
}

