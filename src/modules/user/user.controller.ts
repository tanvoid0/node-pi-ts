import UserService from "./user.service";
import {NextFunction, Request, Response} from "express";
import {ResourceController} from "../../interfaces/service.interface";

class UserController implements ResourceController {
    private service = new UserService();

    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.service.findAll();
            res.json(data);
        } catch (ex) {
            next(ex);
        }
    }

    create(req: Request, res: Response, next: NextFunction): Promise<void> {
        return Promise.resolve(undefined);
    }

    delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        return Promise.resolve(undefined);
    }

    find(req: Request, res: Response, next: NextFunction): Promise<void> {
        return Promise.resolve(undefined);
    }

    update(req: Request, res: Response, next: NextFunction): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export default UserController;