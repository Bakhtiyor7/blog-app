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
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const assert_1 = __importDefault(require("assert"));
class UserService {
    constructor(userModel = user_schema_1.default) {
        this.userModel = userModel;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.userModel.findOne({
                    user_id: data.user_id,
                });
                if (exist) {
                    throw { stats: 400, message: "User already exists" };
                }
                const salt = yield bcrypt_1.default.genSalt();
                data.password = yield bcrypt_1.default.hash(data.password, salt);
                const new_user = new this.userModel(data);
                let result;
                try {
                    result = yield new_user.save();
                }
                catch (mongo_error) {
                    console.log(mongo_error);
                    throw new Error("Error creating a user");
                }
                console.log(result);
                result.password = "";
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    loginData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel
                    .findOne({
                    user_id: data.user_id,
                }, { user_id: 1, password: 1 })
                    .exec();
                assert_1.default.ok(user, "No member found with this id");
                const isMatch = yield bcrypt_1.default.compare(data.password, user.password);
                assert_1.default.ok(isMatch, "User credentials do not  match");
                return yield this.userModel
                    .findOne({
                    user_id: data.user_id,
                })
                    .exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = UserService;
