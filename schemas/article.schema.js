const mongoose = require("mongoose");
const { article_enums } = require("../lib/config");
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
      enum: {
        values: article_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    title: {
      type: String,
      required: false,
      default: "No Title",
    },
    content: {
      type: String,
      required: true,
    },
    article_image: {
      type: String,
      required: false,
    },
    visibility: {
      type: String,
      required: false,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("article", articleSchema);