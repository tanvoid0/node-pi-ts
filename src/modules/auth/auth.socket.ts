import UserModel, {User} from "../user/user.model";
import UserService from "../user/user.service";
import {UserActiveVO} from "../user/user.vo";

class AuthSocket {
    private users = new Map<string, User>();
    private userService: UserService = new UserService();
    private static _instance: AuthSocket;

    private constructor() {}

    public static getInstance(): AuthSocket {
        if (!AuthSocket._instance) {
            AuthSocket._instance = new AuthSocket();
        }
        return AuthSocket._instance;
    }

    userJoined = async (request: UserActiveVO) => {
        if (this.users.has(request.clientId)) {
            return this.users;
        }
        request.active = true;
        const user = await this.userService.find(request.id);
        user.setActive(true);
        this.users.set(request.clientId, user);
        return this.users;
    }

    // userLeft = async (clientId: string) => {
    //     if (!this.users.has(clientId)) {
    //         return;
    //     }
    //     const id: string | undefined = Object.keys(this.users).find((key) => this.users.has(key) && this.users.get(key).clientId === clientId);
    //     if (id === undefined) return;
    //     await this.userService.setActiveUser({id, active: false, clientId});
    //     this.users.delete(clientId);
    // }

    userByClientId = async (id: string) => this.users.get(id);

    // usersInRoom = async (roomId: string) => this.users.filter((user: User) => user.room.id === roomId);

    getActiveUsers = () => this.users;
}

export default AuthSocket;