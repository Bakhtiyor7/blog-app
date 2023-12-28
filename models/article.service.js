const { shapeIntoMongooseObjectId } = require("../lib/config");
const Article = require("../schemas/article.schema");

class ArticleService {
  constructor() {
    this.articleSchema = Article;
  }

  async createArticleData(user, data) {
    try {
      data.user_id = shapeIntoMongooseObjectId(user._id);
      const new_article = await this.saveArticleData(data);
      return new_article;
    } catch (err) {
      throw err;
    }
  }

  async saveArticleData(data) {
    try {
      const article = new this.articleSchema(data);
      return await article.save();
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error("Error saving article");
    }
  }

  async getUserArticlesData(user_id, page = 1, limit = 10) {
    try {
      user_id = shapeIntoMongooseObjectId(user_id);
      const skip = (page - 1) * limit;

      // Adjust the query based on your schema
      const articles = await this.articleSchema
        .find({ user_id: user_id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return articles;
    } catch (err) {
      throw err;
    }
  }

  async getAllArticlesData(blog_id, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const articles = await this.articleSchema
        .find({ blog_id: blog_id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return articles;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ArticleService;
