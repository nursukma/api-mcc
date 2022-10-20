const db = require("../model/index");
const sequelize = require('sequelize');

const User = db.user;

const Op = db.Sequelize.Op;
var bcrypt = require('bcryptjs');

// query for create user
exports.createUser = (req, res) => {
    User.create({
        role: req.body.role,
        email: req.body.email,
        username: req.body.username,
        pwd: bcrypt.hashSync(req.body.pwd, 8),
        fullname: req.body.fullname,
        // created_at: waktu
    }).then(user => {
        res.send({
            data: [{
                role: user.role,
                email: user.email,
                username: user.username,
                pwd: user.pwd,
                fullname: user.fullname
            }],
            message: "OK!",
            statusCode: 200
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// query for update user
exports.updateUser = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: {
            [Op.and]: [
                { id: id },
                { deleted_at: null }
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not Found!"
            });
        }

        User.update({
            role: req.body.role,
            email: req.body.email,
            username: req.body.username,
            pwd: bcrypt.hashSync(req.body.pwd, 8),
            fullname: req.body.fullname,
        }, {
            where: { id: id }
        }).then(() => {
            return User.findOne({ where: { id: id } }).then(user => {
                res.send({
                    data: [{
                        role: user.role,
                        email: user.email,
                        username: user.username,
                        pwd: user.pwd,
                        fullname: user.fullname
                    }],
                    message: "OK!",
                    statusCode: 200
                });
            });
        }).catch(err => {
            res.status(500).send({
                message: "Error Update User id: " + id + " with Error: " + err
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error Get Data User id: " + id + " with Error: " + err
        });
    });
};

// query for delete user
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: {
            [Op.and]: [
                { id: id },
                { deleted_at: null }
            ]
        }
    }).then(() => {
        User.destroy({
            where: {
                id: id
            }
        }).then(user => {
            res.send({
                message: "OK!",
                statusCode: 200
            });
        }).catch(err => {
            res.status(500).send({
                message: err
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error Delete User id: " + id + " with Error: " + err
        });
    });
};

// query for find one user by id
exports.findOneUser = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: {
            [Op.and]: [
                { id: id },
                { deleted_at: null }
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not Found!"
            });
        }
        res.send({
            data: [{
                role: user.role,
                email: user.email,
                username: user.username,
                pwd: user.pwd,
                fullname: user.fullname
            }],
            message: "OK!",
            statusCode: 200
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error Get Data User id: " + id + " with Error: " + err
        });
    });
};

// query for find all user
exports.findAllUser = (req, res) => {
    User.findAll({
        where: {
            deleted_at: null
        }
    }).then(user => {
        res.send({
            data: [user],
            message: "OK!",
            statusCode: 200
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error Get Data User with Error: " + err
        });
    });
};