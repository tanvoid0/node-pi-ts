import HttpException from "./http.exception";

export default class ResourceNotFoundException extends HttpException {
    public resource: string;
    public property: string;
    public value: string;

    constructor(resource: string, property: string, value: any) {
        super(404, `${resource} with ${property}='${value}' not found.`);
        this.property = "id";
        this.value = value;
        this.resource = resource;
    }

}