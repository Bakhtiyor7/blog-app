const mongoose = require("mongoose");
exports.article_enums = ["tutorial", "news", "community"];
exports.visibility_enums = ["public", "private"];

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
