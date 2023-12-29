import assert from "assert";
import ArticleService from "../models/article.service";
import { Request, Response } from "express";

let articleController: any = {};

articleController.createArticle = async (req: Request, res: Response) => {
  try {
    console.log("Post: /createArticle");
    const articleService = new ArticleService();
    const result = await articleService.createArticleData(req.member, req.body);
    assert.ok(result, "Error creating article");

    res.json({ state: "success", data: result });
  } catch (err: any) {
    console.log(`ERROR, cont/createArticle, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

articleController.getUserArticles = async (req: Request, res: Response) => {
  try {
    console.log("Get: /getUserArticles");
    const user_id = req.query.user_id as any;
    const page = parseInt(<any>req.query.page) || 1;
    const limit = 10;

    const articleService = new ArticleService();
    const result = await articleService.getUserArticlesData(
      user_id,
      page,
      limit,
    );

    res.json({ state: "success", data: result });
  } catch (err: any) {
    console.log(`ERROR, cont/getUserArticles, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

articleController.getAllArticles = async (req: Request, res: Response) => {
  try {
    console.log("Get: /getAllArticles");
    const blog_id = req.query.blog_id as any,
      page = parseInt(<any>req.query.page) || 1,
      limit = parseInt(<any>req.query.limit) || 10;

    const articleService = new ArticleService();
    const result = await articleService.getAllArticlesData(
      blog_id,
      page,
      limit,
    );

    res.json({ state: "success", data: result });
  } catch (err: any) {
    console.log(`ERROR, cont/getAllArticles, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

export default articleController;
