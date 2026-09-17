const { registerUserController, loginUserController, getAllUsersController, getUserByIdController } = require("../controllers/users.controllers");
const userRouter = require("express").Router();


userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
module.exports = userRouter;