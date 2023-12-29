"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
// routes
const router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// session store
const MongoDBStore = require("connect-mongodb-session")(express_session_1.default);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: "sessions",
});
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 30, //for 1 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
}));
app.use(function (req, res, next) {
    res.locals.user = req.session.member;
    next();
});
//database connection
const database = process.env.MONGODB_URL;
mongoose_1.default
    .connect(database, {})
    .then(() => {
    console.log("Database connected successfully!");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
app.use("/", router_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
