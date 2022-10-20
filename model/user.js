// const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('account', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: Sequelize.STRING(25),
            vaidate: {
                notEmpty: true
            }
        },
        username: {
            type: Sequelize.STRING(100),
            vaidate: {
                notEmpty: true
            }
        },
        pwd: {
            type: Sequelize.TEXT,
            vaidate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            vaidate: {
                notEmpty: true
            }
        },
        fullname: {
            type: Sequelize.STRING(100),
            vaidate: {
                notEmpty: true
            }
        },
        last_login: { type: Sequelize.DATE(6) },
        created_at: { type: Sequelize.DATE(6) },
        updated_at: { type: Sequelize.DATE(6) },
        deleted_at: 'destroyTime',
    }, {
        paranoid: true,
        timestamps: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName: 'account',
        schema: 'user'
    });

    return User;
};