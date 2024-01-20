// import {Document} from "mongoose";
// import {getModelForClass, prop} from "@typegoose/typegoose";
// import {nanoid} from "nanoid";
//
// export class User {
//     @prop({ default: () => nanoid(9)})
//     _id: string;
//
//     @prop()
//     email: string;
//
//     @prop()
//     password: string;
//
//     @prop()
//     name: string;
// }
// export interface UserVO extends Document {
//     _id: string;
//     email: string;
//     password: string;
//     name: string;
// }
//
import {User} from "./user.model";
import {ObjectId} from "mongoose";

export interface NewUserVO {
    email: string;
    password: string;
    name: string;
}

export interface LoginRequestVO {
    email: string;
    password: string;
}


export interface UserVO {
    id?: string;
    name: string;
    email: string;
    token?: string;
    __v?: number;
}

export interface UserActiveVO {
    id: ObjectId | string;
    clientId: string;
    active: boolean;
}

//
// export class Todo {
//     @prop({ default: () => nanoid(9)})
//     _id: string;
//
//     @prop()
//     title: string;
//
//     @prop()
//     description: string;
//
//     @prop({default: false})
//     completed: boolean
//
//     @prop({default: () => new Date() })
//     createdAt: Date;
// }
//
// export const TodoModel = getModelForClass(Todo);
// export const UserModel = getModelForClass(User);