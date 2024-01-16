import { Request } from "express";

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
