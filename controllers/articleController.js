const ArticleService = require("../models/article.service");
const assert = require("assert");

let articleController = module.exports;

articleController.createArticle = async (req, res) => {
  try {
    const articleService = new ArticleService();
    const result = await articleService.createArticleData(req.member, req.body);
    assert.ok(result, "Error creating article");

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createArticle, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

articleController.getUserArticles = async (req, res) => {
  try {
    console.log("Get: /getUserArticles");
    const user_id = req.query.user_id;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const articleService = new ArticleService();
    const result = await articleService.getUserArticlesData(
      user_id,
      page,
      limit
    );

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getUserArticles, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

articleController.getAllArticles = async (req, res) => {
  try {
    console.log("Get: /getAllArticles");
    const blog_id = req.query.blog_id,
      page = parseInt(req.query.page) || 1,
      limit = parseInt(req.query.limit) || 10;

    const articleService = new ArticleService();
    const result = await articleService.getAllArticlesData(
      blog_id,
      page,
      limit
    );

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getAllArticles, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
