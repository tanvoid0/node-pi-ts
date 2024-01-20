import {Router} from "express";
import ChatRoomController from "./chatRoom.controller";

class ChatRoomRoute {
    public path = '/chatRoom';
    public router = Router();
    public controller = new ChatRoomController();

    constructor() {
        this.router.get(`${this.path}/`, this.controller.find);
        this.router.get(`${this.path}/users`, this.controller.findByUsers);
        this.router.get(`${this.path}/:id`, this.controller.findById)

        this.router.post(`${this.path}/request`, this.controller.request);

        this.router.put(`${this.path}/:id/response`, this.controller.response);

        this.router.delete(`${this.path}/:id`, this.controller.remove);
    }
}

export default ChatRoomRoute;