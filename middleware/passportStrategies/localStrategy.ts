import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";import { getUserByEmailIdAndPassword, getUserById, getUserByEmail } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },

  (email, password, done) => {
    const user = getUserByEmail(email);

    if (!user) {
      return done(null, false, { message: `Couldn't find user with email: ${email}` });
    }

    if (!getUserByEmailIdAndPassword(email, password)) {
      return done(null, false, { message: "Incorrect details, try again" });
    }

    return done(null, user);
  }
);


passport.serializeUser(function (user: Express.User, done) { 
  // console.log("KWERHR3R34HERURHF", user.name)
  done(null, (user as any).id);
});


passport.deserializeUser(function (id: string, done) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
  console.log("deserialize id:", id);
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
