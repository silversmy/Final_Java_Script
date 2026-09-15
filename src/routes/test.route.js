const testEndpoint = require("../controllers/test");
const { authorize, adminAuth } = require("../middleware/auth");

const testRouter = require("express").Router();

testRouter.get('/',testEndpoint);

module.exports = testRouter;