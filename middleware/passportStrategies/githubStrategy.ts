import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import type { VerifyCallback } from "passport-oauth2";
import { Profile } from 'passport-github2';
import "dotenv/config";



const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },

    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try {
            const user = {
                id: Number(profile.id),
                name: profile.displayName,
                email: "",
                password: "",
                role: "user",
            };
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
