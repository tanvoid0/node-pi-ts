// import {model, Schema, SchemaTypes} from "mongoose";
//
// class UserSchema extends Schema {
//     constructor() {
//         super({
//             name: {type: SchemaTypes.String, required: true},
//             email: {type: SchemaTypes.String, required: true},
//             password: {type: SchemaTypes.String, required: true},
//         });
//
//         this.index({email: 1}, {unique: true});
//     }
// }
//
// export default model('User', new UserSchema());

import {getModelForClass, modelOptions, pre, prop, Ref} from "@typegoose/typegoose";
import bcrypt from 'bcrypt';
import {BCRYPT_SALT, schemaOptions} from "../../config/common.config";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {ChatRoom} from "../chat/chatRoom/chatRoom.model";
import {Document} from "mongoose";

// @pre<User>('save', async (next) => {
//     const user = (this as unknown as User);
//     if (!user.isModified('password')) {
//         next();
//     }
// })

@modelOptions(schemaOptions)
export class User extends Document {
    @prop()
    public name: string;

    @prop({unique: true})
    public email: string;

    @prop({select: false})
    public password: string;

    @prop()
    public room: Ref<ChatRoom>

    public clientId: string;

    public active: boolean;

    public setActive(active: boolean) {
        this.active = active;
    }
}

const UserModel = getModelForClass(User);

export default UserModel;