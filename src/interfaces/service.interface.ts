import {NextFunction, Request, Response} from "express";

export interface ResourceService {
    find(id: string): Promise<any>;
    findAll(): Promise<any[]>;
    create(newRequest: Object): Promise<any>;
    update(id: string, updateRequest: Object): Promise<any>;
    delete(id: string): Promise<any>;
}

export interface ResourceController {
    find(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}