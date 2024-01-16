import mongoose from "mongoose";

export const connectDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri, {});
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
  }
};
