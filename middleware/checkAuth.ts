import { RequestHandler } from "express";

/*
FIX ME (types) 😭
*/
export const ensureAuthenticated: RequestHandler  = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}