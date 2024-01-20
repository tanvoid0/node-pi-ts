import {Routes} from "../../interfaces/routes.interfce";
import {Router} from "express";
import UserController from "./user.controller";

class UserRoute implements Routes {
    public path = '/api/users';
    public router = Router();
    public controller = new UserController();

    constructor() {
        this.router.get(`${this.path}`, this.controller.findAll);
    }
}

export default UserRoute;