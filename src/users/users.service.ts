/**
 * Data Model Interfaces
 */
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { BaseUser, User } from './user.interface';
import { Users } from './users.interface';

/**
 * In-Memory Store
 */

const users: Users = {
    1: {
        id: 1,
        login: 'John',
        password: 'passs',
        age: 5,
        isDeleted: false,
    },
    2: {
        id: 2,
        login: 'Doe',
        password: 'passs2',
        age: 45,
        isDeleted: false,
    }
}

/**
 * Service Methods
 */

export const findAll = async (): Promise<User[]> => Object.values(users);

export const getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<User[]> =>
    Object.values(users).filter(user => user.login.startsWith(loginSubstring)).slice(0, limit);

export const find = async (id: number): Promise<User> => users[id];

export const create = async (newUser: BaseUser): Promise<User> => {
    const id = uuidv4();

    users[id] = {
        id,
        isDeleted: false,
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

    users[id] = { id, ...user,  ...userUpdate };

    return users[id];
};

export const remove = async (id: number): Promise<User> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    users[id] = { ...user, isDeleted: true };

    return users[id];
}

