import dotenv from 'dotenv';
import App from "./app";
import HomeRoute from "./modules/home/home.route";
// import UserRoute from "./modules/user/user.route";
import TodoRoute from "./modules/todo/todo.route";
import {logger} from "./utils/logger";
import AuthRoute from "./modules/auth/auth.route";
import UserRoute from "./modules/user/user.route";
import ChatMessageRoute from "./modules/chat/chatMessage/chatMessage.route";
import ChatRoomRoute from "./modules/chat/chatRoom/chatRoom.route";
import QRCodeRoute from "./modules/qrCode/qrCode.route";
import SocketServer from "./socketServer";

dotenv.config();

logger.info(`=================================`)
logger.info(`=========Server Started=======`)

const app = new App([
    new AuthRoute(),
    new HomeRoute(),
    new UserRoute(),
    new ChatRoomRoute(),
    new ChatMessageRoute(),
    new TodoRoute(),
    new QRCodeRoute(),
]);
logger.info(`=========App Configured=======`)

app.start();
logger.info(`=========Server Running=======`)