const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth.js");
const { loginSchema, signupSchema } = require("../validators/auth.js");
const validate = require("../middlewares/validate.js");
const authMiddleware = require("../middlewares/auth.js");
const adminController = require("../controllers/admin.js");

router.route("/register").post(validate(signupSchema), authcontrollers.register);// register new user
router.route("/login").post(validate(loginSchema), authcontrollers.login);// login user
router.route("/user").get(authMiddleware, authcontrollers.user); // Fetch login user data
router.route("/user/update").put(authMiddleware, authcontrollers.updateUser); // Update user data
router.route('/users').get(authMiddleware , adminController.getAllUsers);// fetch all user data
router.route('/users/:userId').delete(authMiddleware, adminController.deleteUserById);


module.exports = router;
