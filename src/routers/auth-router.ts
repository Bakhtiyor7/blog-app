// google auth
import router from "./router";
import passport from "passport";
import express from "express";
import { userController } from "../controllers/userController";

const auth_router = express.Router();

// MAIL authentication routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/check-login", userController.checkAuthentication);

// GOOGLE auth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.redirect("/auth/success");
  }
);

router.get("/google/logout", (req, res) => {
  console.log("session 1:", req.session);
  req.logout((err) => {
    if (err) {
      return res.send("Error during logout process");
    }
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.send("Error logging out");
        }
        console.log("session:", req.session);
        res.redirect("/logout-menu");
      });
    } else {
      res.redirect("/logout-menu");
    }
  });
});

router.get("/auth/check", (req, res) => {
  if (!req.user) {
    res.send("Not logged in, 이미 로그아웃되었습니다");
  } else {
    res.send("Still logged in, 로그인된사용자입니다");
  }
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/auth/success", (req, res) => {
  if (req.user) {
    res.send("successfully logged in, 로그인 되었습니다");
  }
});

router.get("/logout-menu", (req, res) => {
  res.send("logged out successfully, 로그아웃되었습니다");
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "failed to login",
  });
});

export default auth_router;
