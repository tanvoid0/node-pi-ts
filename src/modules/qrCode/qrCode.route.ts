import { Router } from 'express';
import QRCodeController from './qrCode.controller';
import authMiddleware from '../../middlewares/auth.middleware';

class QRCodeRoute {
    public path = '/api/qr';
    public router = Router();
    public controller = new QRCodeController();

    constructor() {
        this.router.post(`${this.path}/generate`, authMiddleware, this.controller.generate);
        // this.router.post(`${this.path}/scan`, this.controller.scan);
    }
}

export default QRCodeRoute;