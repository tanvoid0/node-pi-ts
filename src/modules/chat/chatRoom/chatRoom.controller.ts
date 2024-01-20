import ChatRoomService from "./chatRoom.service";
import {NextFunction, Request, Response} from "express";

class ChatRoomController {
    private service: ChatRoomService;

    find = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await this.service.find());
        } catch (err) {
            next(err);
        }
    }

    findByUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            return res.json(await this.service.findChatRoomByUsers(req.query.user1, req.query.user2));
        } catch (err) {
            next(err);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await this.service.findById(req.params.id));
        } catch (err) {
            next(err);
        }
    }

    request = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await this.service.request({...req.body, finderId: req.user}));
        } catch (err) {
            next(err);
        }
    }

    response = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            return res.json(await this.service.response({id: req.params.id, user: req.user, status: req.query.status}));
        } catch (err) {
            next(err);
        }
    }

    remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await this.service.remove(req.params.id));
        } catch (err) {
            next(err);
        }
    }
}


export default ChatRoomController;

