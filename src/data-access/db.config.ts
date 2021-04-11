import { Sequelize, TEXT, BOOLEAN, INTEGER } from 'sequelize';
import { DATABASE_CONFIG } from './database';
// import { DATABASE_CONFIG } from './p_database';

const USER_CONSTRUCTOR = {
    login: {
        allowNull: false,
        type: TEXT,
        validate: {
            isAlphanumeric: true,
            is: '^[a-zA-Z]\\w{3,14}$',
        }
    },
    password: {
        type: TEXT,
        allowNull: false,
        validate: {
            is: '^(?=.*\\d)(?=.*[a-zA-Z])(?!.*\\s).{2,100}$',
            isAlphanumeric: true,
        }
    },
    age: {
        type: INTEGER,
        allowNull: false,
        validate: {
            min: 4,
            max: 130,
        }
    },
    isDeleted: {
        type: BOOLEAN,
        allowNull: true,
    },
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

// @ts-ignore
export const Op = Sequelize.Op;
export const User = sequelize.define('users', USER_CONSTRUCTOR, {
    timestamps: false,
    schema: 'public',
    tableName: 'users'
});
