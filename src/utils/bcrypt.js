const bcrypt = require("bcrypt");


const hashPassword = async (password) =>{
    const salt = 10;

    return await bcrypt.hash(password, salt);
};

module.exports = {hashPassword};