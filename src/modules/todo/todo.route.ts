import {NextFunction, Request, Response, Router} from "express";
import {Routes} from "../../interfaces/routes.interfce";
import TodoModel from "./todo.model";

class TodoRoute implements Routes {
    public path = "/api/todos";
    public router = Router();

    constructor() {
        this.router.get(`${this.path}`, async (req: Request, res: Response, next: NextFunction) => {
           const doc =  await TodoModel.find();
           res.json(doc);
        });

        this.router.post(`${this.path}`, async (req: Request, res: Response, next: NextFunction) => {
           const doc = new TodoModel({title: "New Data", description: "Some random task", completed: true});
           await doc.save();
           res.status(201).json(doc);
        });
    }
}

export default TodoRoute;