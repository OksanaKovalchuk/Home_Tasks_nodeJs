import { TEXT, STRING } from 'sequelize';
import { sequelize } from '../data-access/db.config';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
export type group = {
    id: string;
    name: string;
    permissions: Permission[];
};

const GROUP_CONSTRUCTOR = {
    name: {
        allowNull: false,
        type: TEXT,
        validate: {
            isAlphanumeric: true,
        }
    },
    permission: {
        type: STRING,
        validate: {
            isIn: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        }
    },
};

export const Group = sequelize.define('groups', GROUP_CONSTRUCTOR, {
    timestamps: false,
    schema: 'public',
    tableName: 'groups'
});
