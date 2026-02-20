const database = [
  {
    id: "1",
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
  },
  {
    id: "2",
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",

  },
  {
    id: "3",
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: "4",
    name: "admin",
    email: "a@a",
    password: "a",
    role: "admin",
  },
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    // throw new Error(`Couldn't find user with email: ${email}`);
    return null;
  },
  findById: (id: string) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    // throw new Error(`Couldn't find user with id: ${id}`);
    return null;
  },
};

const addToDB = (user: Express.User) => {
  database.push(user);
  console.log(database)
}

export { database, userModel, addToDB };
