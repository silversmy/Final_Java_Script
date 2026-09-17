const { registerUserController, loginUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController} = require("../controllers/users.controllers");
const userRouter = require("express").Router();


userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
userRouter.put('/:id', updateUserController);
userRouter.delete('/:id', deleteUserController)
module.exports = userRouter;