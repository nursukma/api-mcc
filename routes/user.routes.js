const { authJWT } = require('../middleware');
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/users/create", [authJWT.verifyToken, authJWT.checkDuplicateUsernameOrEmail], controller.createUser);
    app.put("/users/update/:id", [authJWT.verifyToken, authJWT.checkDuplicateUsernameOrEmail], controller.updateUser);
    app.delete("/users/delete/:id", [authJWT.verifyToken], controller.deleteUser);
    app.get("/users/:id", [authJWT.verifyToken], controller.findOneUser);
    app.get("/users", [authJWT.verifyToken], controller.findAllUser);
};