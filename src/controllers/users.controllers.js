const {
   createUser,
   findUserByEmail,
   findAllUsers,
   findUserById,
   updateUserById,
   deleteUserById
} = require ("../repositories/users.repositories");
const { registerUserSchema, loginUserSchema } = require ("../validators/users");
const { hashPassword, comparePassword} = require("../utils/bcrypt");
const aToken = require("../config/jwt");


const registerUserController = async (req, res) => {
  try {
    // validate user input and return error if needed
    const { error, value } = registerUserSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error.message});
    };

    // destructing fields into value
    const {firstName, lastName, email, password} = value;

    const userExixts = await findUserByEmail(email);

    if (userExixts) return res.status(400).json({ error: "User exists" });

    const hashedPassword =await hashPassword(password);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const user = await createUser(newUser);

    const { password: pass, ...safeUser } = user;

    return res
      .status(201)
      .json({ message: "Account created successfully", safeUser });
  } catch (error) {
    console.log(`Error registering user. Error: ${error}`);

    return res.status(500).json({error: `Internal server error`});
  }
};

const loginUserController = async (req, res) => {
  try {
    // validate user's input
    const { error, value } = loginUserSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const { email, password } = value;

    // check if user exists
    const userExists = await findUserByEmail(email);

    if (!userExists) {
      return res
        .status(404)
        .json({ error: "User not found. Kindly create an account to login" });
    }

    // validate the user's password
    const isMatch = await comparePassword(password, userExists.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // sign access token with user's details
    const accessToken = aToken({ id: userExists.id, email: userExists.email, role: userExists.role });

    // return token to user
    return res.status(200).json({ 
      message: "Logged in successfully",
      email: userExists.email,
      id: userExists.id,
      accessToken 
    });
  } catch (error) {
    console.log(`Error logging in user. Error: ${error}`);

    return res.status(500).json({ error: `Internal sever error` });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json({
      message: "Users fetched successfully",
      users
    });
  } catch (error) {
    console.log(`Error fetching users. Error: ${error}`);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.status(200).json({
      message: "User fetched succesfully", user
    });
  } catch (error) {
    console.log(`Error fetching user, Error: ${error}`);

    return res.status(500).json({
      error:"Internal server error"
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await updateUserById(id, req.body);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.status(200).json({
      message:"User updated successfully", user
    })
  } catch (error) {
    console.log(`Error updating user, Error: ${error}`);

    return res.status(500).json({
      error: "internal server error"
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await deleteUserById(id);

    if (!user) {
      return res.status(404).json({
        error:"User not found"
      });
    }

    return res.status(200).json({
      message: "User deleted successfully", user
    })
  } catch (error) {
    console.log(`Error deleting user, Error: ${error}`);

    return res.status(500).json({
      error: "internal server error"
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController
};