import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./routers/router";
import auth_router from "./routers/auth-router";
import passport from "passport";
import { passportConfig } from "./config/passport-config";
import { sessionStore } from "./config/session-store";
import { setMember } from "./middlewares/setMember";
import { connectDatabase } from "./database/db-config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// session store
const store = sessionStore();

//middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(setMember);
app.use(passport.initialize());
app.use(passport.session());
// ========================

// configurations
passportConfig(); // google passport config
const db_uri = process.env.MONGODB_URL;
connectDatabase(db_uri); // db connection config

//routes
app.use("/", router, auth_router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
