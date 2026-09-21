const { registerUserController, loginUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController} = require("../controllers/users.controllers");
const { authorize, adminAuth, ownAccount } = require("../middleware/auth");

const userRouter = require("express").Router();


userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.get('/', authorize, adminAuth, getAllUsersController);
userRouter.get('/:id', authorize, ownAccount, getUserByIdController);
userRouter.put('/:id', authorize, ownAccount, updateUserController);
userRouter.delete('/:id', authorize, ownAccount, deleteUserController);
module.exports = userRouter;