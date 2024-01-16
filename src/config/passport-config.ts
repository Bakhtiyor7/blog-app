import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../schemas/user.schema";

export const passportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("profile:", profile);
          // Check if user exists with the Google email
          const existingUser = await User.findOne({
            email: profile.emails?.[0].value,
          });

          if (existingUser) {
            // User exists, but signed up traditionally. Link Google ID if not already linked
            if (!existingUser.google_id) {
              existingUser.google_id = profile.id;
              await existingUser.save();
            }
            return done(null, existingUser);
          }

          // If user with the Google email doesn't exist, create a new user
          const newUser = await User.create({
            google_id: profile.id,
            email: profile.emails?.[0].value,
            // other fields...
          });

          return done(null, newUser);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    ),
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
