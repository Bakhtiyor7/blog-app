const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

// authentication routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/check-user", userController.checkAuthentication);

module.exports = router;
