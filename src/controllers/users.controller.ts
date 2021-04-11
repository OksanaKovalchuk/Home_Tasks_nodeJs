import { User, Op } from '../data-access/db.config';

/**
 * Create and Save a new User
 */
const create = (newUser: any) => User.create(newUser);

/**
 * Retrieve all Users from the database.
 * @param loginSubstring
 * @param limit
 */
const findAll = (loginSubstring: string = '', limit: number = 500) => {
     const condition = loginSubstring ? { login: { [Op.iLike]: `%${loginSubstring}%` } }: null;

     return User.findAndCountAll({ where: condition, limit }).catch(err => {throw Error(err)});
};

/**
 * Find a single User with an id
 */
const findOne = (id: number) => User.findByPk(id);

/**
 *  Update a User by the id in the request
 * @param userUpdate
 * @param id
 */
const update = (userUpdate: Partial<any>, id: number | null) => {
    return User.update(userUpdate, {
        where: { id }
    }).then(() => User.findByPk(id))
};

/**
 * Delete a User with the specified id in the request
 * @param user
 * @param id
 */
const deleteUser = (user: Partial<any>, id: number | null) => update({ ...user, isDeleted: true }, id);


export default {
    create,
    findAll,
    findOne,
    update,
    deleteUser
};
