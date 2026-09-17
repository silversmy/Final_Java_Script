const User = require("../models/user");


const findUserByEmail = async (email) => {
    return await User.findOne({where: {email}});
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ['password']}
  });
};

const findUserById = async (id) => {
    return await User.findByPk(id);
};

const updateUserById = async(id, userData) => {
    const user = await User.findByPk(id);

    if(!user) {
        return null;
    }

    return await user.update(userData)
};

const deleteUserById = async(id) => {
    const user = await User.findByPk(id);
    
    if(!user) {
        return null;
    }

    await user.destroy()

    return user;

};

module.exports = {findUserByEmail,
    createUser,
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
}