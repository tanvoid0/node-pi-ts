import UserModel, {User} from "./user.model";
import ResourceNotFoundException from "../../exceptions/resource.not.found.exception";
import {ResourceService} from "../../interfaces/service.interface";
import {UserActiveVO} from "./user.vo";
import {ObjectId} from "mongoose";

class UserService implements ResourceService {
    private userModel = UserModel;

    public async findAll() {
        return UserModel.find();
    }

    public async find(id: string | ObjectId): Promise<User> {
        return UserModel.findById(id).orFail(() => new ResourceNotFoundException('user', 'id', id));
    }

    public async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email}).orFail(() => new ResourceNotFoundException('user', 'email', email));
    }

    public async findByEmailWithPassword(email: string) {
        const user = await this.userModel.findOne({email}).select(['+password']);
        if (!user) {
            throw new ResourceNotFoundException("User", "email", email);
        }
        return user;
    }

    create(newRequest: Object): Promise<any> {
        return Promise.resolve(undefined);
    }

    public async setActiveUser(request: UserActiveVO) {
        return UserModel.findOneAndUpdate({id: request.id}, {
            active: request.active,
            lastActive: Date.now()
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        });
    }


    update(id: string, updateRequest: Object): Promise<any> {
        return Promise.resolve(undefined);
    }


    delete(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }


}

export default UserService;
