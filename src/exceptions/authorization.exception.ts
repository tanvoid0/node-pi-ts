import HttpException from "./http.exception";

export default class AuthorizationException extends HttpException {
    constructor(status: number, message: string) {
        super(status, message);
    }

    static tokenNotFound() {
        return new AuthorizationException(404, "Authentication token missing");
    }

    static invalidToken() {
        return new AuthorizationException(401, "Invalid Authentication token");
    }

    static userNotFound(userId: string) {
        return new AuthorizationException(401, `User with id ${userId} not found.`);
    }

    static userAlreadyExists(email: string) {
        return new AuthorizationException(400, `User with email ${email} already exists.`);
    }

    static invalidCredentials() {
        return new AuthorizationException(400, "Invalid credentials provided.");
    }

}