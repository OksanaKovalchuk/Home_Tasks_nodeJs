/**
 * Data Model Interfaces
 */
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import controller from '../controllers/users.controller';
import { User } from '../data-access/db.config';

/**
 * Service Methods
 */

export const findAll = async (loginSubstring: string, limit: number): Promise<any> =>
    await controller.findAll(loginSubstring, limit);

export const find = (id: number): Promise<any> => controller.findOne(id);

export const create = async (newUser: User): Promise<any> => {
    return controller.create(newUser);
};

export const update = async (
    id: number,
    userUpdate: User
): Promise<any | null> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    return controller.update(userUpdate, id);
};

export const remove = async (id: number): Promise<any> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    return controller.deleteUser({ ...user }, id);
}

