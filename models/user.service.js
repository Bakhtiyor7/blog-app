const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const assert = require("assert");

class UserService {
  constructor() {
    this.user = User;
  }

  async createUser(data) {
    try {
      const exist = await User.findOne({
        user_id: data.user_id,
      });
      if (exist) {
        throw { stats: 400, message: "User already exists" };
      }

      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      const new_user = new this.user(data);

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

  async loginData(data) {
    try {
      console.log(data);
      const user = await this.user
        .findOne(
          {
            user_id: data.user_id,
          },
          { user_id: 1, password: 1 }
        )
        .exec();

      assert.ok(user, "No member found with this id");

      const isMatch = await bcrypt.compare(data.password, user.password);

      assert.ok(isMatch, "User credentials do not  match");

      return await this.user
        .findOne({
          user_id: data.user_id,
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
