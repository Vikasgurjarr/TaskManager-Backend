const express = require('express');
const adminController = require("../controllers/admin");
const authMiddleware = require ("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin")

const router = express.Router();

// Admin routes
router.route('/users').get(authMiddleware ,adminMiddleware, adminController.getAllUsers);


module.exports = router;
