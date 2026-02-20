import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }
  }
}

export {};