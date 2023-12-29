"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./controllers/userController");
const express_1 = __importDefault(require("express"));
const articleController_1 = __importDefault(require("./controllers/articleController"));
const router = express_1.default.Router();
// authentication routes
router.post("/signup", userController_1.userController.signup);
router.post("/login", userController_1.userController.login);
router.get("/logout", userController_1.userController.logout);
router.get("/check-login", userController_1.userController.checkAuthentication);
// blog
router.post("/blog/create", userController_1.userController.retrieveAuthMember, articleController_1.default.createArticle);
router.get("/blog/user-articles", userController_1.userController.retrieveAuthMember, articleController_1.default.getUserArticles);
router.get("/blog/all-articles", userController_1.userController.retrieveAuthMember, articleController_1.default.getAllArticles);
exports.default = router;
