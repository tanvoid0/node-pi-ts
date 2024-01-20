import express, {Application} from "express";
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import DBConfig from "./config/db.config";
import {Routes} from "./interfaces/routes.interfce";
import {CREDENTIALS, NODE_ENV, ORIGIN, PORT} from "./config/common.config";
import errorMiddleware from "./middlewares/error.middleware";
import {logger} from "./utils/logger";
import AuthConfig from "./config/auth.config";
import authMiddleware from "./middlewares/auth.middleware";
import http, {Server} from 'http';
import SocketServer from "./socketServer";

export default class App {
    public app: Application;
    public server: Server;
    public env: string;
    public port: string | number;
    public dbConfig: DBConfig;
    private authConfig: AuthConfig;
    public routes: Routes[];
    private socketServer: SocketServer;

    constructor(routes: Routes[]) {
        logger.info(`=========App Init=======`)
        this.app = express();
        this.server = http.createServer(this.app);
        this.socketServer = new SocketServer(this.server);
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;
        this.dbConfig = new DBConfig();
        this.authConfig = new AuthConfig();
        this.routes = routes;
        this.config();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    config() {
        logger.info(`=================================`)
        logger.info(`=========App Configuration=======`)
        this.dbConfig.connect();
        this.authConfig.config(this.app);

        logger.info(`====App Configuration Completed====`)
    }

    initializeMiddleware() {
        logger.info(`=================================`)
        logger.info(`=========App Middleware Configuration=======`)
        this.app.use(cors({origin: ORIGIN, credentials: CREDENTIALS}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cookieParser());
        logger.info(`====App Middleware Configuration Completed====`)
    }

    initializeRoutes() {
        logger.info(`=================================`)
        logger.info(`=========App Route Configuration=======`)
        this.routes.forEach((route => {
            // If auth route, skip auth middleware
            if (route.publicAccess) {
                this.app.use('/', route.router);
            } else {
                this.app.use("/", authMiddleware, route.router);
            }

        }));
        logger.info(`====App Route Configuration Completed====`)
    }

    initializeErrorHandling() {
        this.app.use(errorMiddleware)
    };

    async start() {
        this.socketServer.start();
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
        // this.server.listen(this.port, () => {
        //     logger.info(`================================`)
        //     logger.info(`==========HTTP Server============`)
        //     logger.info(`🚀 HTTP Server listening on the port ${this.port}`);
        //     logger.info(`=================================`);
        // });
    }
}