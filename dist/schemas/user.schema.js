"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
        index: { unique: true, sparse: true },
    },
    user_name: {
        type: String,
        required: true,
        index: { unique: true, sparse: true },
    },
    email: {
        type: String,
        email: true,
        required: true,
        index: { unique: true, sparse: true },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
