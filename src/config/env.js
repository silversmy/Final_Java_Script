const dotenv = require("dotenv");

dotenv.config();

const env = {
    port: process.env.PORT,
    dburl: process.env.DATABASE_URL
};

module.exports = env;