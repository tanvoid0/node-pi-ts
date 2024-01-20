import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {schemaOptions} from "../../config/common.config";
import {User} from "../user/user.model";

@modelOptions(schemaOptions)
export class QRCode extends TimeStamps {
    @prop({required: true, ref: () => User})
    public owner: Ref<User>;

    @prop({default: false})
    public anon: boolean;
}

const QrCodeModel = getModelForClass(QRCode);
export default QrCodeModel;