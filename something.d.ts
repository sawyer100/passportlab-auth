import "express";


interface userGuy {
  id: number,
  name: string,
  email: string,
  password: string, 
  // pretty sure ts is horrible idea but just because it lab
  role: string,
}

declare global {
  namespace Express {
    interface User extends userGuy {
    }
  }
}

export { };
