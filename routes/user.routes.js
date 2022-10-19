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

    // app.get("/api/test/all", [authJWT.verifyToken], controller.allAccess);
    app.post("/api/user/create", [authJWT.verifyToken, authJWT.checkDuplicateUsernameOrEmail], controller.createUser);
    app.put("/api/user/update/:id", [authJWT.verifyToken, authJWT.checkDuplicateUsernameOrEmail], controller.updateUser);
    app.put("/api/user/delete/:id", [authJWT.verifyToken], controller.deleteUser);
    app.get("/api/user/findOne/:id", [authJWT.verifyToken], controller.findOneUser);
    app.get("/api/user/findAll", [authJWT.verifyToken], controller.findAllUser);
};