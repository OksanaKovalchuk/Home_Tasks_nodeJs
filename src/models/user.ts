import { TEXT, BOOLEAN, INTEGER } from 'sequelize';
import { sequelize } from '../data-access/db.config';

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

export const User = sequelize.define('users', USER_CONSTRUCTOR, {
    timestamps: false,
    schema: 'public',
    tableName: 'users'
});
