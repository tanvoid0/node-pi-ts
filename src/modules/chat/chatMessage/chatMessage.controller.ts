import {NextFunction, Request, Response} from "express";
import ChatMessageService from "./chatMessage.service";

class ChatMessageController {
    private service: ChatMessageService;

    find = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await this.service.find());
        } catch(err) {
            next(err);
        }
    }

    findByRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.findByRoom(req.params.room));
        } catch(err) {
            next(err);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.findById(req.params.id));
        } catch(err) {
            next(err);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.create({...req.body, sender: req.user}));
        } catch(err) {
            next(err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.update({...req.body, id: req.params.id}));
        } catch(err) {
            next(err);
        }
    }

    remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.remove(req.params.id));
        } catch(err) {
            next(err);
        }
    }
}

export default ChatMessageController;