const express = require("express");
const user_controller = require("../controllers/user_controller");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = express.Router();

router.post("/register", user_controller.registerUser);
router.post("/login", user_controller.loginUser);
router.post("/logout", authenticateJWT, user_controller.logoutUser);

module.exports = router;
