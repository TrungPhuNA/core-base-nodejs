import { DataTypes } from 'sequelize'
import db from './index.js'
import bcrypt from 'bcrypt'
import { USER_ROLES, USER_STATUS } from '../../config/constants.js'

const User = db.sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(USER_ROLES.USER, USER_ROLES.ADMIN),
            defaultValue: USER_ROLES.USER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(USER_STATUS.ACTIVE, USER_STATUS.INACTIVE),
            defaultValue: USER_STATUS.ACTIVE,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt)
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt)
                }
            },
        },
    }
)

// Instance methods
User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

User.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
}

export default User

