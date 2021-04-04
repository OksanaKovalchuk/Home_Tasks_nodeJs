import { sequelize, User, Op } from '../data-access/db.config';

/**
 * Create and Save a new User
 */
const create = (newUser: any) => User.create(newUser);

/**
 * Retrieve all Users from the database.
 * @param loginSubstring
 */
const findAll = (loginSubstring: string) => {
     const condition = loginSubstring ? { login: { [Op.iLike]: `%${loginSubstring}%` } }: null;
     return User.findAll({ where: condition }).catch(err => {throw Error(err)});
};

/**
 * Find a single User with an id
 */
const findOne = (id: number) => User.findByPk(id);

/**
 *  Update a User by the id in the request
 * @param userUpdate
 */
const update = (userUpdate: Partial<any>) => {
    const id = userUpdate.id;

    return User.update(userUpdate, {
        where: { id }
    })
};

/**
 * Delete a User with the specified id in the request
 * @param user
 */
const deleteUser = (user: Partial<any>) => update({ ...user, isDeleted: true });


export default {
    create,
    findAll,
    findOne,
    update,
    deleteUser
};
