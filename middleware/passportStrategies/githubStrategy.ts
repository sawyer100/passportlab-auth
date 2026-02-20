import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import type { VerifyCallback } from "passport-oauth2";
import { Profile } from 'passport-github2';
import "dotenv/config";
import { addToDB } from '../../models/userModel';



const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
        // i was typing the env and vscode autocompletel told me to use "as string" cause is better idk why tho
    },

    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try {
            const id = profile.id;
            const username = profile.username || (profile as any)?._json?.login || "";
            const name =
                profile.displayName ||
                (profile as any)?._json?.name ||
                username ||
                "random guy";
            //sm time there no display name ig
            const user: Express.User = {
                id: profile.id,
                name: name,
                email: "",
                password: "",
                role: "user",
            };
            addToDB(user);
            return done(null, user);
        } catch (err) {
            return done(err as Error);
        }
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
