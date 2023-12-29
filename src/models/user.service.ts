import User from "../schemas/user.schema";
import bcrypt from "bcrypt";
import assert from "assert";
import { UserData } from "../controllers/interfaces/user.interface";

class UserService {
  constructor(private readonly userModel = User) {}

  async createUser(data: UserData) {
    try {
      const exist = await this.userModel.findOne({
        user_id: data.user_id,
      });
      if (exist) {
        throw { stats: 400, message: "User already exists" };
      }

      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      const new_user = new this.userModel(data);

      let result;
      try {
        result = await new_user.save();
      } catch (mongo_error) {
        console.log(mongo_error);
        throw new Error("Error creating a user");
      }

      console.log(result);

      result.password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(data: UserData) {
    try {
      const user = await this.userModel
        .findOne(
          {
            user_id: data.user_id,
          },
          { user_id: 1, password: 1 },
        )
        .exec();

      assert.ok(user, "No member found with this id");

      const isMatch = await bcrypt.compare(data.password, user.password);

      assert.ok(isMatch, "User credentials do not  match");

      return await this.userModel
        .findOne({
          user_id: data.user_id,
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
