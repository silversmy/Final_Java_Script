const User = require("../models/user");
const { hashPassword } = require("../utils/bcrypt");


const findUserByEmail = async (email) => {
    return await User.findOne({where: {email}});
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findAllUsers = async (page, limit) => {
    const offset = (page - 1) * limit;

  return await User.findAndCountAll({
    attributes: { exclude: ['password']},
    order: [['id', 'ASC']],
    limit,
    offset
  });
};

const findUserById = async (id) => {
    return await User.findByPk(id, {attributes: { exclude: ["password"] }});
};

const updateUserById = async(id, userData) => {
    const user = await User.findByPk(id);

    if(!user) {
        return null;
    }

    const data = { ...userData};

    if(data.password) {
        data.password = await hashPassword(data.password);
    }

    await user.update(data);

    const { password, ...safeUser } = user.toJSON();

    return safeUser;
};

const deleteUserById = async(id) => {
    const user = await User.findByPk(id, { attributes: { exclude: ["password"]}});
    
    if(!user) {
        return null;
    }

    await user.destroy();

    return user;

};

module.exports = {findUserByEmail,
    createUser,
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
}