import { userController } from "./controllers/userController";
import express from "express";
import articleController from "./controllers/articleController";
import passport from "passport";

const router = express.Router();

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "failed to login",
  });
});
// authentication routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/check-login", userController.checkAuthentication);

// google auth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.redirect("/auth/success");
  },
);
router.get("/google/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      throw err;
    }
    res.redirect("/logout-menu");
  });
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/auth/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "successfully logged in, 로그인 되었습니다",
      user: req.user,
    });
  }
});

router.get("/logout-menu", (req, res) => {
  res.send("logged out successfully, 로그아웃되었습니다");
});

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
