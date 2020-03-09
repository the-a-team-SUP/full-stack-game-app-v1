import strategy from "passport-facebook";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const FacebookStrategy = strategy.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
      profileFields: ["id", "displayName", "email"]
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
