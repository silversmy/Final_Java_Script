const { createUser, findUserByEmail } = require ("../repositories/users.repositories");
const { registerUserSchema } = require ("../validators/users");
const {hashPassword} = require("../utils/bcrypt");


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

module.exports = {registerUserController}