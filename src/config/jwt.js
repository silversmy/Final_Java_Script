const jwt = require("jsonwebtoken");

const aToken = (payload) => {
    jwt.sign(payload, "jwt-secret", { expiresIn: "1h" });
};

module.exports =aToken;