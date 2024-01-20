import {Routes} from "../../../interfaces/routes.interfce";
import {Router} from "express";
import ChatMessageController from "./chatMessage.controller";

class ChatMessageRoute implements Routes {
    public path = '/chatMessage';
    public router = Router();
    public controller = new ChatMessageController();

    constructor() {
        this.router.get(`${this.path}`, this.controller.find);
        this.router.get(`${this.path}/room/:room`, this.controller.findByRoom)
        this.router.get(`${this.path}/:id`, this.controller.findById);

        this.router.post(`${this.path}`, this.controller.create);

        this.router.put(`${this.path}/:id`, this.controller.update);

        this.router.delete(`${this.path}/:id`, this.controller.remove);


    }
}

export default ChatMessageRoute;