import HttpException from "./http.exception";

class InvalidRequestException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}

export default InvalidRequestException;