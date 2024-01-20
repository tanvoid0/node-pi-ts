import QrCodeService from "./qrCode.service";
import {Request, Response, NextFunction} from "express";
import {QRGenerateRequest} from "./qrCode.vo";
import InvalidRequestException from "../../exceptions/invalidRequest.exception";
import {User} from "../user/user.model";
import {UserVO} from "../user/user.vo";
import { Types } from "mongoose";
import { RequestWithUser } from "../../interfaces/auth.interface";

class QrCodeController {
    private qrService = new QrCodeService();

    showAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.qrService.showAll());
        } catch (ex) {
            next(ex);
        }
    }

    generate = async (req: any, res: Response, next: NextFunction) => {
        try {
            console.log(typeof req.query.anon)
            if (req.query.anon === undefined) {
                throw new InvalidRequestException("A boolean query value for anon is required");
            } else if (req.user == undefined || req.user.id == undefined) {
                throw new InvalidRequestException("Invalid Authentication user id.");
            }
            const request: QRGenerateRequest = {anon: req.query.anon == "true", ownerId: req.user.id};
            res.json(await this.qrService.generate(request));
        } catch(ex) {
            next(ex);
        }
    }
}

export default QrCodeController;