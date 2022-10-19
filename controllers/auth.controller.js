const db = require('../model');
const config = require('../config/auth.config');
const sequelize = require('sequelize');

const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signin = (req, res) => {
    User.findOne({
        where: {
            [Op.and]: [
                { username: req.body.username },
                { deleted_at: null }
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User Not Found!"
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.pwd,
            user.pwd
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 604800
        });

        User.update({
            last_login: sequelize.literal('CURRENT_TIMESTAMP')
        }, {
            where: { id: user.id }
        });

        // var authorities = [];
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            // roles: authorities,
            accessToken: token
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};