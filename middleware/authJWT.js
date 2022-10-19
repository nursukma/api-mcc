const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../model');
const User = db.user;

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

const authJWT = {
    verifyToken: verifyToken,
    // isLogin: isLogin
};

module.exports = authJWT;