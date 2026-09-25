const { registerUserController, loginUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController} = require("../controllers/users.controllers");
const { authorize, adminAuth, ownAccount } = require("../middleware/auth");

const userRouter = require("express").Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 maxLength: 8
 *                 example: Test1234
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
userRouter.post('/register', registerUserController);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT access token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
  *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john@example.com
 *                 id:
 *                   type: integer
 *                   example: 9
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.post('/login', loginUserController);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a paginated list of users. Admin access required.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalUsers:
 *                   type: integer
 *                   example: 25
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid pagination parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', authorize, adminAuth, getAllUsersController);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a user by their ID. Normal users can only access their own account, while admins can access any user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 9
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You can only access your own account
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/:id', authorize, ownAccount, getUserByIdController);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates a user's account. Normal users can only update their own account, while admins can update any user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or invalid user ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You can only access your own account
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put('/:id', authorize, ownAccount, updateUserController);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user account. Normal users can only delete their own account, while admins can delete any user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 9
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You can only access your own account
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete('/:id', authorize, ownAccount, deleteUserController);
module.exports = userRouter;