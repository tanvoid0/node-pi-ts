import {isEmpty} from "class-validator";
import HttpException from "../../exceptions/http.exception";
import UserService from "../user/user.service";
import UserModel from "../user/user.model";
import {LoginRequestVO, NewUserVO, UserVO} from "../user/user.vo";
import AuthorizationException from "../../exceptions/authorization.exception";
import bcrypt from "bcrypt";
import {BCRYPT_SALT, JWT_SECRET} from "../../config/common.config";
import jwt from 'jsonwebtoken';

class AuthService {
    public model = UserModel;
    private userService = new UserService();

    public login = async (request: LoginRequestVO) => {
        if (isEmpty(request)) throw new HttpException(400, "Missing request body");

        const user = await this.userService.findByEmailWithPassword(request.email)
            .then((data) => data)
            .catch((ex) => {
                throw AuthorizationException.invalidCredentials()
            });

        await this.comparePassword(request.password, user.password).then((data) => {
            if (!data) {
                throw AuthorizationException.invalidCredentials()
            }
        });
        const authenticatedUser: UserVO = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: this.attachToken(user.id, user.email)
        };
        return authenticatedUser;
    }

    public register = async (request: NewUserVO) => {
        const isEmailAlreadyExists = await UserModel.findOne({
            email: request.email
        });

        if (isEmailAlreadyExists) {
            throw AuthorizationException.userAlreadyExists(request.email);
        }

        return await UserModel.create({
            name: request.name,
            email: request.email,
            password: await this.encryptPassword(request.password)
        });
    }

    public authenticate = async (user: UserVO) => {
        return user;
    }

    private attachToken = (_id: string, email: string) => {
        return jwt.sign({
            _id,
            email,
            iat: new Date().getTime()
        }, JWT_SECRET!, {expiresIn: '7d'});
    }

    private encryptPassword = async (password: string) => {
        return await bcrypt.hash(password, Number(BCRYPT_SALT))
    }

    private comparePassword = async (requestPassword: string, existingPassword: string) => {
        return await bcrypt.compare(requestPassword, existingPassword);
    }
}

export default AuthService;