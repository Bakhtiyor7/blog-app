import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./router";
import "./googleStrategy";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "./schemas/user.schema";

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

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

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
//======================= GOOGLE AUTHENTICATION =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ google_id: profile.id });

      // If user doesn't exist creates a new user. (similar to sign up)
      if (!user) {
        const newUser = await User.create({
          google_id: profile.id,
          email: profile.emails?.[0].value,
          // we are using optional chaining because profile.emails may be undefined.
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    },
  ),
);

// ================================================================

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

// Google ===========
// app.use(passport.initialize());
// app.use(passport.session);

// ===================

//routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
