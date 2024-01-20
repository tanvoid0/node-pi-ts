import {JWT_SECRET} from "../config/common.config";
import * as crypto from "crypto";
import {EncryptedQrInterface} from "../modules/qrCode/qrCode.vo";

class EnigmaUtil {
    private algorithm = 'aes-256-cbc';
    private key = JWT_SECRET ?? crypto.randomBytes(32);
    private iv = crypto.randomBytes(16);

    encrypt(text: string): EncryptedQrInterface {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);

        let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

        return {
            iv: this.iv.toString('hex'),
            data: encrypted,
        }
    }

    decrypt(data: EncryptedQrInterface): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, data.iv);
        return decipher.update(data.data, 'hex', 'utf8') + decipher.final('utf8');
    }
}

export default EnigmaUtil;