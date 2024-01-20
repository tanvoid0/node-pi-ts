import {DB_DATABASE, DB_HOST, DB_PORT, NODE_ENV} from "./common.config";
import _mongoose, {connect, Connection, connection, ConnectOptions, set} from 'mongoose';
import {logger} from "../utils/logger";
//
// declare global {
//     var mongoose: {
//         promise: ReturnType<typeof connect> | null;
//         conn: typeof _mongoose | null;
//     }
// }

class DBConfig {
    config = {
        url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }

    db?: Connection;

    constructor() {
        this.db = undefined;
        if (NODE_ENV !== 'production') {
            set('debug', true);
        }
    }

    connect() {
        if(this.db) {
            return;
        }
        connect(this.config.url).then(()=> {
            logger.info(`Connected to database in ${NODE_ENV}`)
        }).catch((ex) => {
            logger.error(`Error connecting to database ${ex}`);
        });
        this.db = connection;
    }
}

export default DBConfig;