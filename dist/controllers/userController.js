"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = __importDefault(require("../models/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const assert_1 = __importDefault(require("assert"));
let userController = {};
exports.userController = userController;
userController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Post: /signup");
        const data = req.body, user = new user_service_1.default(), new_user = yield user.createUser(data);
        const jwtToken = userController.createToken(new_user);
        res.cookie("access_token", jwtToken, {
            maxAge: 6 * 3600 * 1000,
            httpOnly: false,
        });
        res.json({ state: "success", data: new_user });
    }
    catch (err) {
        console.log("Error: cont/signup", err.message);
        res.json({ state: "fail", message: err.message });
    }
});
userController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Post: /login");
        const data = req.body, user = new user_service_1.default(), result = yield user.loginData(data);
        const jwtToken = userController.createToken(result);
        res.cookie("access_token", jwtToken, {
            maxAge: 6 * 3600 * 1000,
            httpOnly: false,
        });
        res.json({ state: "success", data: result });
    }
    catch (err) {
        console.log("Error: cont/login", err.message);
        res.json({ state: "fail", message: err.message });
    }
});
userController.logout = (req, res) => {
    console.log("GET cont/logout");
    res.cookie("access_token", null, { maxAge: 0, httpOnly: true });
    res.json({ state: "success", data: "Logged out successfully!" });
};
// token creation logic
userController.createToken = (result) => {
    try {
        const upload_data = {
            _id: result._id,
            user_id: result.user_id,
            user_name: result.user_name,
            email: result.email,
        };
        const token = jsonwebtoken_1.default.sign(upload_data, process.env.SECRET_TOKEN, {
            expiresIn: "6h",
        });
        assert_1.default.ok(token, "Error creating a token");
        return token;
    }
    catch (err) {
        throw err;
    }
};
userController.checkAuthentication = (req, res) => {
    try {
        console.log("Get: /checkAuthentication");
        let token = req.cookies["access_token"];
        console.log("token:", token);
        const user = token ? jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN) : null;
        assert_1.default.ok(user, "Not authenticated user");
        res.json({ state: "success", data: user });
    }
    catch (err) {
        throw err;
    }
};
userController.retrieveAuthMember = (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        req.member = token ? jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN) : null;
        next();
    }
    catch (err) {
        console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
        next();
    }
};
