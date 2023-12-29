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
const assert_1 = __importDefault(require("assert"));
const article_service_1 = __importDefault(require("../models/article.service"));
let articleController = {};
articleController.createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleService = new article_service_1.default();
        const result = yield articleService.createArticleData(req.member, req.body);
        assert_1.default.ok(result, "Error creating article");
        res.json({ state: "success", data: result });
    }
    catch (err) {
        console.log(`ERROR, cont/createArticle, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
});
articleController.getUserArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Get: /getUserArticles");
        const user_id = req.query.user_id;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const articleService = new article_service_1.default();
        const result = yield articleService.getUserArticlesData(user_id, page, limit);
        res.json({ state: "success", data: result });
    }
    catch (err) {
        console.log(`ERROR, cont/getUserArticles, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
});
articleController.getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Get: /getAllArticles");
        const blog_id = req.query.blog_id, page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || 10;
        const articleService = new article_service_1.default();
        const result = yield articleService.getAllArticlesData(blog_id, page, limit);
        res.json({ state: "success", data: result });
    }
    catch (err) {
        console.log(`ERROR, cont/getAllArticles, ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
});
exports.default = articleController;
