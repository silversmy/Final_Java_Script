const { registerUserController } = require("../controllers/users.controllers");
const userRouter = require("express").Router();


userRouter.post('/register', registerUserController);

module.exports = userRouter;