const ArticleService = require("../models/article.service");
const articleSchema = require("../schemas/article.schema");
const assert = require("assert");

let articleController = module.exports;

articleController.createArticle = async (req, res) => {
  try {
    console.log("Post: /createARticle");
    const articleService = new ArticleService();
    const result = await articleService.createArticleData(req.member, req.body);
    assert.ok(result, "Error creating article");

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createArticle, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
