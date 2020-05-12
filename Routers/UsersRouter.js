const express = require("express");
const userController =require("../controllers/userController");
const authentication = require("../controllers/Authentication");
function routes(userSchema)
{
    const UserRouter = express.Router();
    const controller = userController(userSchema);

    UserRouter.post("/register", controller.register);
    UserRouter.post("/login", controller.login);

    return UserRouter;
}

module.exports = routes;