import { NextFunction, Request, Response } from "express";

export const safeThrow = (fn: (req: Request, res: Response, next?: NextFunction) => Promise<any>) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
