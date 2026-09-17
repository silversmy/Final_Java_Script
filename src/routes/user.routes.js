const { registerUserController, loginUserController, getAllUsersController } = require("../controllers/users.controllers");
const userRouter = require("express").Router();


userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.get('/', getAllUsersController);

module.exports = userRouter;