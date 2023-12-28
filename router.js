const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const articleController = require("./controllers/articleController");

// authentication routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/check-user", userController.checkAuthentication);

// blog
router.post(
  "/blog/create",
  userController.retrieveAuthMember,
  articleController.createArticle
);
router.get(
  "/blog/user-articles",
  userController.retrieveAuthMember,
  articleController.getUserArticles
);
router.get(
  "/blog/all-articles",
  userController.retrieveAuthMember,
  articleController.getAllArticles
);

module.exports = router;
