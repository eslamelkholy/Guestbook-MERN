const express = require("express");
const userController =require("../controllers/userController");

function routes(userSchema)
{
    const UserRouter = express.Router();
    const controller = userController(userSchema);

    UserRouter.post("/register", controller.register)

    return UserRouter;
}

module.exports = routes;