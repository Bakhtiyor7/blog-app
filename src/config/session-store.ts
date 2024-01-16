import session from "express-session";

const MongoDBStore = require("connect-mongodb-session")(session);

export const sessionStore = () => {
  return new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: "sessions",
  });
};
