// const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        role: {
            type: Sequelize.STRING
        },
        username: { type: Sequelize.STRING },
        pwd: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        fullname: { type: Sequelize.STRING },
        last_login: { type: Sequelize.DATE },
        created_at: { type: Sequelize.DATE },
        updated_at: { type: Sequelize.DATE },
        deleted_at: { type: Sequelize.DATE },
    });

    return User;
};