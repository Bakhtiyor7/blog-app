import { Session } from "express-session";

declare module "express" {
  interface Request {
    session: Session & { member?: any }; // Adjust the type according to your actual member type
  }
}
