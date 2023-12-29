import UserService from "../models/user.service";
import jwt from "jsonwebtoken";
import assert from "assert";
import { NextFunction, Request, Response } from "express";
import { TokenData } from "./interfaces/user.interface";

let userController: any = {};

userController.signup = async (req: Request, res: Response) => {
  try {
    console.log("Post: /signup");
    const data = req.body,
      user = new UserService(),
      new_user = await user.createUser(data);

    const jwtToken = userController.createToken(new_user);

    res.cookie("access_token", jwtToken, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });
    res.json({ state: "success", data: new_user });
  } catch (err: any) {
    console.log("Error: cont/signup", err.message);
    res.json({ state: "fail", message: err.message });
  }
};

userController.login = async (req: Request, res: Response) => {
  try {
    console.log("Post: /login");

    const data = req.body,
      user = new UserService(),
      result = await user.loginData(data);

    const jwtToken = userController.createToken(result);

    res.cookie("access_token", jwtToken, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });
    res.json({ state: "success", data: result });
  } catch (err: any) {
    console.log("Error: cont/login", err.message);
    res.json({ state: "fail", message: err.message });
  }
};

userController.logout = (req: Request, res: Response) => {
  console.log("GET cont/logout");

  res.cookie("access_token", null, { maxAge: 0, httpOnly: true });
  res.json({ state: "success", data: "Logged out successfully!" });
};

// token creation logic
userController.createToken = (result: TokenData) => {
  try {
    const upload_data = {
      _id: result._id,
      user_id: result.user_id,
      user_name: result.user_name,
      email: result.email,
    };

    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, "Error creating a token");
    return token;
  } catch (err) {
    throw err;
  }
};

userController.checkAuthentication = (req: Request, res: Response) => {
  try {
    console.log("Get: /checkAuthentication");
    let token = req.cookies["access_token"];

    const user = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(user, "Not authenticated user");

    res.json({ state: "success", data: user });
  } catch (err) {
    throw err;
  }
};

userController.retrieveAuthMember = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["access_token"];
    req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    next();
  } catch (err: any) {
    console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
    next();
  }
};

export { userController };
