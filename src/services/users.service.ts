import { Op } from '../data-access/db.config';
import { User } from '../models/user';

/**
 * Service Methods
 */

/**
 * Retrieve all Users from the database.
 * @param loginSubstring
 * @param limitValue
 */
export const findAll = async (loginSubstring: string, limitValue: number): Promise<any> => {
    const condition = loginSubstring ? { login: { [Op.iLike]: `%${loginSubstring}%` } }: null;
    const limit = limitValue || null;
    return await User.findAndCountAll({ where: condition, limit }).catch(err => {throw Error(err)});
}

/**
 * Find a single User with an id
 * @param id
 */
export const find = async (id: number): Promise<any> => await User.findByPk(id);

/**
 * Create and Save a new User
 * @param newUser
 */
export const create = async (newUser: User): Promise<any> => await User.create(newUser);

/**
 *  Update a User by the id in the request
 * @param id
 * @param userUpdate
 */
export const update = async (
    id: number,
    userUpdate: User
): Promise<any | null> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    return User.update(userUpdate, {
        where: { id }
    }).then(() => find(id));
};

/**
 * Delete a User with the specified id in the request
 * @param id
 */
export const remove = async (id: number): Promise<any> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    return update(id, { ...user, isDeleted: true });
}

