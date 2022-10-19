// const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        role: Sequelize.String,
        username: Sequelize.String,
        pwd: Sequelize.String,
        email: Sequelize.String,
        fullname: Sequelize.String,
        last_login: Sequelize.Date,
        created_at: Sequelize.Date,
        updated_at: Sequelize.Date,
        deleted_at: Sequelize.Date,
    });

    return User;
};