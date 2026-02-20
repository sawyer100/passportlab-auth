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
      return done(null, false, { message: "Email not found" });
    }

    if (!getUserByEmailIdAndPassword(email, password)) {
      return done(null, false, { message: "Incorrect details, try again" });
    }

    return done(null, user);
  }
);


passport.serializeUser(function (user: Express.User, done) { 
  //i dont think done needs a type caues its in the serlaizeUser defiition (and i dont know hwo to type it)
  //also i think u dont need a type for user either but im putitng it incase im wrong and i lose marks
  done(null, user.id);
});


passport.deserializeUser(function (id: number, done) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
