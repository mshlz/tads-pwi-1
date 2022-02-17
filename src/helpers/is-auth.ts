import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SKEY } from "../config/env";
import { UnauthenticatedError } from "./http";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenString = (req.headers.authorization || '').replace(/^Bearer /, '')
    const sessionToken = req.session['token']

    if (!tokenString && !sessionToken) {
      throw new UnauthenticatedError('Missing authorization token')
    }

    const payload = jwt.verify(tokenString || sessionToken, JWT_SKEY)
    req.session['user'] = payload

    next()
  } catch (error) {
    if (req.headers['content-type'] !== 'application/json') {
      return res.redirect('login')
    }
    next(error)
  }
};
