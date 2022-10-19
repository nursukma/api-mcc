const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../model');
const User = db.user;

const Op = db.Sequelize.Op;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: "No Token Provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

// isLogin = (req, res, next) => {
//     User.findByPk(req.userId).then(user => {
//         user.getRoles().then(roles => {
//             if (roles.name === "Superadmin") {
//                 next();
//                 return;
//             }

//             res.status(403).send({
//                 message: "Not Authorized User!"
//             });
//             return;
//         });
//     });
// };

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            [Op.and]: [
                { username: req.body.username },
                { deleted_at: null }
            ]
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                [Op.and]: [
                    { email: req.body.email },
                    { deleted_at: null }
                ]
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

const authJWT = {
    verifyToken: verifyToken,
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
        // isLogin: isLogin
};

module.exports = authJWT;