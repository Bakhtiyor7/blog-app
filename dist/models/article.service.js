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
const config_1 = require("../lib/config");
const article_schema_1 = __importDefault(require("../schemas/article.schema"));
class ArticleService {
    constructor(articleSchema = article_schema_1.default) {
        this.articleSchema = articleSchema;
    }
    createArticleData(user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                data.user_id = (0, config_1.shapeIntoMongooseObjectId)(user._id);
                const new_article = yield this.saveArticleData(data);
                return new_article;
            }
            catch (err) {
                throw err;
            }
        });
    }
    saveArticleData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = new this.articleSchema(data);
                return yield article.save();
            }
            catch (mongo_err) {
                console.log(mongo_err);
                throw new Error("Error saving article");
            }
        });
    }
    getUserArticlesData(user_id, page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user_id = (0, config_1.shapeIntoMongooseObjectId)(user_id);
                const skip = (page - 1) * limit;
                // Adjust the query based on your schema
                const articles = yield this.articleSchema
                    .find({ user_id: user_id }) // Adjust as needed
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit);
                return articles;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getAllArticlesData(blog_id, page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const articles = yield this.articleSchema
                    .find({ blog_id: blog_id }) // Adjust as needed
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit);
                return articles;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = ArticleService;
