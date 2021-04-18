import { Sequelize } from 'sequelize';
import { DATABASE_CONFIG } from '../config/database';
// import { DATABASE_CONFIG } from '../config/p_database';

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
