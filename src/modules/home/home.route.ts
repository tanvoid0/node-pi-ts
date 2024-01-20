import {Routes} from "../../interfaces/routes.interfce";
import {Router} from "express";
import HomeController from "./home.controller";

class HomeRoute implements Routes {
    public path = '/';
    public router = Router();
    public controller = new HomeController();

    constructor() {
        this.router.get(`${this.path}`, this.controller.index);
    }
}

export default HomeRoute;