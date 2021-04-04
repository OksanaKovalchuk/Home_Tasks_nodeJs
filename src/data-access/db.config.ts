import { Sequelize, TEXT, BOOLEAN, INTEGER } from 'sequelize';
import { DATABASE_CONFIG } from './database';
// import { DATABASE_CONFIG } from './p_database';

const USER_CONSTRUCTOR = {
    login: { type: TEXT },
    password: { type: TEXT },
    age: { type: INTEGER },
    isDeleted: { type: BOOLEAN },
};
/**
 * Database config
 */
const { databaseName, username, password, poolSettings } = DATABASE_CONFIG;
export const sequelize = new Sequelize(databaseName, username, password, poolSettings);
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

export const Op = Sequelize.Op;
export const User = sequelize.define('users', USER_CONSTRUCTOR, {
    timestamps: false,
    schema: 'public',
    tableName: 'users'
});
