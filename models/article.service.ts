import { shapeIntoMongooseObjectId } from "../lib/config";
import Article from "../schemas/article.schema";
import { Types } from "mongoose";
import { ArticleDocument } from "../schemas/interfaces/article.interface";

class ArticleService {
  constructor(private readonly articleSchema = Article) {}

  async createArticleData(user: { _id: string }, data: any) {
    try {
      data.user_id = shapeIntoMongooseObjectId(user._id);
      const new_article = await this.saveArticleData(data);
      return new_article;
    } catch (err) {
      throw err;
    }
  }

  async saveArticleData(data: any) {
    try {
      const article = new this.articleSchema(data);
      return await article.save();
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error("Error saving article");
    }
  }

  async getUserArticlesData(user_id: Types.ObjectId, page = 1, limit = 10) {
    try {
      user_id = shapeIntoMongooseObjectId(user_id);
      const skip = (page - 1) * limit;

      // Adjust the query based on your schema
      const articles = await this.articleSchema
        .find({ user_id: user_id } as any) // Adjust as needed
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return articles;
    } catch (err) {
      throw err;
    }
  }

  async getAllArticlesData(blog_id: string, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const articles = await this.articleSchema
        .find({ blog_id: blog_id } as any) // Adjust as needed
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return articles;
    } catch (err) {
      throw err;
    }
  }
}

export default ArticleService;
