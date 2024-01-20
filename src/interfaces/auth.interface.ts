import {Request} from 'express';
import {UserVO} from "../modules/user/user.vo";

export interface DataStoredInToken {
    _id: string;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request {
    user: UserVO;
}