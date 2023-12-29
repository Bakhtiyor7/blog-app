import { Document, Schema, Types } from 'mongoose';
import { article_enums, visibility_enums } from '../../lib/config';

interface Article {
    blog_id: {
        type: string;
        required: true;
        enum: {
            values: string[];
            message: string;
        };
    };
    title: {
        type: string;
        required: false;
        default: string;
    };
    content: {
        type: string;
        required: true;
    };
    article_image: {
        type: string;
        required: false;
    };
    visibility: {
        type: string;
        required: false;
        enum: {
            values: string[];
            message: string;
        };
    };
    user_id: {
        type: Types.ObjectId;
        ref: 'User';
        required: true;
    };
    timestamps: boolean;
}

export interface ArticleDocument extends Article, Document {}

