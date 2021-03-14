/**
 * Data Model Interfaces
 */

import { BaseUser, User } from './user.interface';
import { Users } from './users.interface';


/**
 * In-Memory Store
 */

let users: Users = {
    1: {
        id: 1,
        login: 'John',
        password: 'passs',
        age: 5,
        isDeleted: true,
    },
    2: {
        id: 2,
        login: 'Doe',
        password: 'passs2',
        age: 45,
        isDeleted: true,
    }
}


/**
 * Service Methods
 */

export const findAll = async (): Promise<User[]> => Object.values(users);

export const find = async (id: number): Promise<User> => users[id];

export const create = async (newUser: BaseUser): Promise<User> => {
    const id = new Date().valueOf();

    users[id] = {
        id,
        ...newUser,
    };

    return users[id];
};

export const update = async (
    id: number,
    userUpdate: BaseUser
): Promise<User | null> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    users[id] = { id, ...userUpdate };

    return users[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    delete users[id];
}

