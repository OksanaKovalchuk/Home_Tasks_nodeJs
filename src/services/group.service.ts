import { Group, group } from '../models/group';

/**
 * Service Methods
 */

/**
 * Retrieve all Groups from the database.
 */
export const findAll = async (): Promise<any> =>
    await Group.findAndCountAll().catch(err => {throw Error(err)});

/**
 * Find a single Group with an id
 * @param id
 */
export const find = async (id: number): Promise<any> => await Group.findByPk(id);

/**
 * Create and Save a new Group
 * @param newGroup
 */
export const create = async (newGroup: group): Promise<any> => await Group.create(newGroup);

/**
 *  Update a Group by the id in the request
 * @param id
 * @param groupUpdate
 */
export const update = async (
    id: number,
    groupUpdate: group
): Promise<any | null> => {
    const user = await find(id);

    if (!user) {
        return null;
    }

    return Group.update(groupUpdate, {
        where: { id }
    }).then(() => find(id));
};

/**
 * Delete a Group with the specified id in the request
 * @param id
 */
export const remove = async (id: number): Promise<any> => {
    const groupToRemove = await find(id);

    if (!groupToRemove) {
        return null;
    }

    return Group.destroy({
        where: { id }
    }).then(() => find(id));
}

