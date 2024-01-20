import {NextFunction, Request, Response} from "express";
import ResourceNotFoundException from "../../exceptions/resource.not.found.exception";

export default class HomeController {
    public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            throw new ResourceNotFoundException("User", "id", "1");
            // res.json("Welcome Home")
        } catch(ex) {
            next(ex);
        }
    }
}