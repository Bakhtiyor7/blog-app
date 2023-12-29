import mongoose, { Types } from 'mongoose';

export const article_enums = ["tutorial", "news", "community"] as const;
export const visibility_enums = ["public", "private"] as const;

export const shapeIntoMongooseObjectId = (target: string | Types.ObjectId) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
