import {ExtractJwt, Strategy, VerifyCallback} from 'passport-jwt';
import {JWT_SECRET} from "./common.config";
import UserModel from "../modules/user/user.model";
import AuthorizationException from "../exceptions/authorization.exception";
import passport from "passport";
import express, {Application, Express, Request} from "express";
import {logger} from "../utils/logger";

class AuthConfig {
    private jwtStrategy: Strategy;

    public config(app: Application) {
        if (this.jwtStrategy) return;
        logger.info("Configuring JWT Strategy");
        app.use(passport.initialize());

        this.jwtStrategy = new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        }, (payload, done) => {
            UserModel.findById(payload._id)
                .then((user) => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch((error) => {
                    throw AuthorizationException.userNotFound(payload.id);
                })
        });
        passport.use(this.jwtStrategy);
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((_id: string, done) => {
            UserModel.findById(_id).then((user) => {
                done(null, user);
            }).catch((ex) => {
                done(AuthorizationException.userNotFound(_id));
            });
        });
    }
}

export default AuthConfig;