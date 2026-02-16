import "express";

//idk if there is another type to use but i cant figure it out 
//so im merging id into express.user because express.user isnt giving me a user.id 🤷‍♂️
declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

export {};
