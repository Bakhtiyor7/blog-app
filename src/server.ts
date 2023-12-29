import express, { NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
// routes
import router from "./router";
import { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
      MONGODB_URL: string;
      SECRET_TOKEN: string;
    }
  }
  namespace Express {
    interface Request {
      member?: any;
    }
  }
}

// session store
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, //for 1 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.locals.member = req.session.member;
  next();
});

//database connection
const database = process.env.MONGODB_URL;

mongoose
  .connect(database, {})
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
