import EnigmaUtil from "../../utils/enigma.util";
import FileUtil from "../../utils/file.util";
import QrCodeModel from "./qrCode.model";
import {EncryptedQrInterface, QRGenerateRequest, QRGenerateResponse} from "./qrCode.vo";

class QrCodeService {
    private enigmaService = new EnigmaUtil();
    private fileService = new FileUtil();

    showAll = async () => QrCodeModel.find();

    generate = async (request: QRGenerateRequest)=> {
        const qrCode = await this.findOrCreateByUserId(request);

        const encryptedData = this.enigmaService.encrypt(JSON.stringify(qrCode));

        return this.fileService.generateQRImage(JSON.stringify(encryptedData));
    }

    scan = async (request: EncryptedQrInterface) => {
        const decryptedData = this.enigmaService.decrypt(request);
        const qrObject = JSON.parse(decryptedData);
        return this.findById(qrObject)
    }

    findById = async (request: QRGenerateResponse) => {
        return QrCodeModel.findById(request.id).populate('owner')
            .then((data) => this.anonFilter(data))
    }

    anonFilter = async (qrCode: any) => {
        if (qrCode.anon) {
            qrCode.ownerId = qrCode.owner.id;
            qrCode.owner = undefined;
        }
        return qrCode;
    }

    findOrCreateByUserId = async (request: QRGenerateRequest) => {
        return await QrCodeModel.findOneAndUpdate({owner: request.ownerId}, {owner: request.ownerId, anon: request.anon}, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }).then((qrCode) => this.anonFilter(qrCode));
    }
}

export default QrCodeService;