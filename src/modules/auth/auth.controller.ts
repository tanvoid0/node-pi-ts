import {NextFunction, Request, Response} from "express";
import AuthService from "./auth.service";

class AuthController {
    public service = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.login(req.body));
        } catch (ex) {
            next(ex);
        }
    }

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.register(req.body));
        } catch(ex) {
            next(ex);
        }
    }
}

export default AuthController;