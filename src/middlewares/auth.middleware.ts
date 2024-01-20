// import {NextFunction, Response} from "express";
// import {DataStoredInToken, RequestWithUser} from "../interfaces/auth.interface";
// import {SECRET_KEY} from "../config/config";
// import {verify} from "jsonwebstoken";
// import AuthorizationException from "../exceptions/authorization.exception";
//
// const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
//     try {
//         const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
//
//         if (Authorization) {
//             const secretKey: string = SECRET_KEY || "";
//             const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
//             const userId = verificationResponse._id;
//             const findUser = await UserModel.findById(userId);
//
//             if (userId) {
//                 req.user = findUser;
//                 next();
//             } else {
//                 next(AuthorizationException.invalidToken());
//             }
//         } else {
//             next(AuthorizationException.tokenNotFound());
//         }
//     } catch (ex) {
//         next(AuthorizationException.invalidToken());
//     }
// }
//
// export default authMiddleware;

import passport from "passport";

const authMiddleware = passport.authenticate('jwt', {session: false}, );

export default authMiddleware;