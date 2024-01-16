import { NextFunction, Request, Response } from "express";

export const setMember = (req: Request, res: Response, next: NextFunction) => {
  res.locals.member = req.session.member;
  next();
};
