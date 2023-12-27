const { shapeIntoMongooseObjectId } = require("../lib/config");
const articleSchema = require("../schemas/article.schema");

class ArticleService {
  constructor() {
    this.articleSchema = articleSchema;
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
}

module.exports = ArticleService;
