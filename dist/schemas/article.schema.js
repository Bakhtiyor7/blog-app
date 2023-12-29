"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../lib/config");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const articleSchema = new mongoose_1.default.Schema({
    blog_id: {
        type: String,
        required: true,
        enum: {
            values: config_1.article_enums,
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
        enum: {
            values: config_1.visibility_enums,
            message: "{VALUE} is not among permitted values",
        },
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
const Article = mongoose_1.default.model("article", articleSchema);
exports.default = Article;
