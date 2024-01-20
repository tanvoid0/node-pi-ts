import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const schemaOptions = {
    schemaOptions: {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
};

export const {
    NODE_ENV,
    PORT,
    SOCKET_PORT,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    SECRET_KEY, LOG_FORMAT,
    LOG_DIR,
    ORIGIN, JWT_SECRET,
    JWT_EXPIRES_IN,
    BCRYPT_SALT
} = process.env;