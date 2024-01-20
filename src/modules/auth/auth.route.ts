import {Routes} from "../../interfaces/routes.interfce";
import {Router} from "express";
import AuthController from "./auth.controller";
import authMiddleware from "../../middlewares/auth.middleware";

class AuthRoute implements Routes {
    public path = "/auth";
    public router = Router();
    public publicAccess = true;
    public controller = new AuthController();

    constructor() {
        this.router.post(`${this.path}/authenticate`, authMiddleware, (req, res, next) => {
            res.json(req.user)
        });
        this.router.post(`${this.path}/login`, this.controller.login);
        this.router.post(`${this.path}/register`, this.controller.register);
    }
}

export default AuthRoute;