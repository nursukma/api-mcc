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
        fullname: req.body.email,
        // created_at: waktu
    }).then(() => {
        res.send({ message: "User was Added Successfully!!" });
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
            fullname: req.body.email,
        }, {
            where: { id: id }
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "User was Updated Successfully!"
                });
            } else {
                res.send({
                    message: `Cannot Update User id:${id}.`
                });
            }
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
        User.update({
            deleted_at: sequelize.literal('CURRENT_TIMESTAMP')
        }, {
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).send({
                message: "User was Deleted Successfully! "
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
        res.status(200).send(user);
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
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error Get Data User with Error: " + err
        });
    });
};