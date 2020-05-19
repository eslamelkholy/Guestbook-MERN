const express = require("express");
const userController =require("../controllers/userController");
const authentication = require("../controllers/Authentication");
const auth = require("../controllers/middleware");
function routes(userSchema)
{
    const UserRouter = express.Router();
    const controller = userController(userSchema);

    UserRouter.post("/register", controller.register);
    UserRouter.post("/login", controller.login);
    UserRouter.post("/user/googlelogin", controller.googleLogin);
    UserRouter.post("/user/facebooklogin", controller.facebooklogin);
    UserRouter.get("/user",auth ,controller.authUser)
    return UserRouter;
}

module.exports = routes;