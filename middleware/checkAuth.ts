import { RequestHandler } from "express";

export const ensureAuthenticated: RequestHandler  = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}


export const forwardAuthenticated: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}