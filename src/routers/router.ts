import { userController } from "../controllers/userController";
import express from "express";
import articleController from "../controllers/articleController";
import passport from "passport";

const router = express.Router();

// authentication routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/check-login", userController.checkAuthentication);

// blog
router.post(
  "/blog/create",
  userController.retrieveAuthMember,
  articleController.createArticle,
);
router.get(
  "/blog/user-articles",
  userController.retrieveAuthMember,
  articleController.getUserArticles,
);
router.get(
  "/blog/all-articles",
  userController.retrieveAuthMember,
  articleController.getAllArticles,
);

export default router;
