import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SKEY } from "../config/env";
import { UnauthenticatedError } from "./http";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenString = (req.headers.authorization || '').replace(/^Bearer /, '')
    if (!tokenString) {
      throw new UnauthenticatedError('Missing authorization token')
    }

    const payload = jwt.verify(tokenString, JWT_SKEY)
    req['ctx'] = payload

    next()
  } catch (error) {
    next(error)
  }
};
