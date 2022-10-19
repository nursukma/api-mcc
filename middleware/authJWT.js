const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../model');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-acces-token'];

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

const authJWT = {
    verifyToken: verifyToken,
};

module.exports = authJWT;