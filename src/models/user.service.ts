import User from "../schemas/user.schema";
import bcrypt from "bcrypt";
import assert from "assert";
import { UserData } from "../interfaces/user.interface";

class UserService {
  constructor(private readonly userModel = User) {}

  async createUser(data: UserData) {
    try {
      const exist = await this.userModel.findOne({
        email: data.email,
      });
      if (exist) {
        //
        return { error: "User already exists" };
      }

      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      const new_user = new this.userModel(data);

      let result;
      try {
        result = await new_user.save();
      } catch (mongo_error) {
        console.log(mongo_error);
        return { error: "can't create a user" };
      }

      console.log(result);

      result.password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async createGoogleUser(data: UserData) {
    try {
      let user = await this.userModel
        .findOne({
          $or: [{ google_id: data.google_id }, { email: data.email }],
        })
        .exec();

      if (user) {
        // If the user exists but doesn't have a google_id, update it
        if (!user.google_id) {
          user.google_id = data.google_id;
          await user.save();
        }
      } else {
        // If no user exists with that email, create a new user
        user = new this.userModel(data);
        await user.save();
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async loginData(data: UserData) {
    try {
      const user = await this.userModel
        .findOne(
          {
            email: data.email,
          },
          { email: 1, password: 1 },
        )
        .exec();

      assert.ok(user, "No member found with this id");

      const isMatch = await bcrypt.compare(data.password, user.password);

      assert.ok(isMatch, "User credentials do not  match");

      return await this.userModel
        .findOne({
          email: data.email,
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
