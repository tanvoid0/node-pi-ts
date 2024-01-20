import { ObjectId } from "mongoose";
import {User} from "../user/user.model";

export interface QRGenerateRequest {
    anon: boolean;
    ownerId: string;
}

export interface QRGenerateResponse {
    id: string;
    anon: boolean;
}

export interface QRCodeWithOwnerInterface extends QRGenerateResponse {
    owner?: User;
}

export interface QRCodeWithOwnerIdInterface extends QRGenerateResponse {
    ownerId?: string;
}

export interface EncryptedQrInterface {
    iv: string;
    data: string;
}