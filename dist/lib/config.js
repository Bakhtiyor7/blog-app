"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shapeIntoMongooseObjectId = exports.visibility_enums = exports.article_enums = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.article_enums = ["tutorial", "news", "community"];
exports.visibility_enums = ["public", "private"];
const shapeIntoMongooseObjectId = (target) => {
    if (typeof target === "string") {
        return new mongoose_1.default.Types.ObjectId(target);
    }
    else
        return target;
};
exports.shapeIntoMongooseObjectId = shapeIntoMongooseObjectId;
